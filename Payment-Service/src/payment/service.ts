import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { Payment, PaymentDocument } from './schema';
import { CreateCheckoutSessionDto } from './create-checkout-session';
import { CreateRefundDto } from './create-refund-data';
import { PaymentStatus } from './schema';

@Injectable()
export class PaymentService {
  private readonly stripe: Stripe;
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      // apiVersion: '2024-04-10',
      apiVersion: '2025-05-28.basil',
    });
  }

  async createCheckoutSession(payload: CreateCheckoutSessionDto): Promise<{ sessionId: string; paymentUrl: string }> {
    try {
      const { orderId, amount, currency } = payload;
   console.log(payload);
      // Create Stripe checkout session without validation
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: `Order ${orderId}`,
              },
              unit_amount: amount * 100, // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        metadata: { orderId },
        payment_intent_data: { metadata: { orderId } },
        success_url: 'https://checkout.stripe.com/success', 
      cancel_url: 'https://checkout.stripe.com/cancel',

      });
      if (!session.url) {
      throw new Error('Checkout session URL is null');
    }
    
      // Save payment
      const payment = new this.paymentModel({
        orderId,
        sessionId: session.id,
        amount,
        currency: currency.toLowerCase(),
        status: PaymentStatus.PENDING,
      });
      await payment.save();

      return { sessionId: session.id, paymentUrl: session.url! };
    } catch (error) {
      this.logger.error('Error creating checkout session', error);
      throw new BadRequestException(error.message || 'Failed to create checkout session');
    }
  }

  async createRefund(payload: CreateRefundDto): Promise<{ refund_id: string; status: string }> {
    try {
      const { orderId, sessionId } = payload;

      // Find payment
      const payment = await this.paymentModel.findOne({ orderId, sessionId });
      if (!payment) {
        throw new BadRequestException('Payment not found');
      }
// console.log("Refund");
      // Check if already refunded
      if (payment.status === PaymentStatus.REFUNDED) {
        throw new BadRequestException('Payment already refunded');
      }

      // Get payment intent from session
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      if (!session.payment_intent) {
        throw new BadRequestException('No payment intent found');
      }

      // Create refund
      const refund = await this.stripe.refunds.create({
        payment_intent: session.payment_intent as string,
        amount: payment.amount * 100, // Convert to cents
        metadata: { orderId },
      });

      // Update payment
      payment.refund_id = refund.id;
      payment.status = PaymentStatus.REFUNDED;
      payment.updated_at = new Date();
      await payment.save();

      return { refund_id: refund.id, status: PaymentStatus.REFUNDED };
    } catch (error) {
      this.logger.error('Error creating refund', error);
      throw new BadRequestException(error.message || 'Failed to create refund');
    }
  }

  async handleWebhook(event: Stripe.Event): Promise<void> {
    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          const payment = await this.paymentModel.findOne({ sessionId: session.id });
          if (payment) {
            payment.status = PaymentStatus.SUCCEEDED;
            payment.updated_at = new Date();
            await payment.save();
          }
          break;
        }
        case 'checkout.session.expired': {
          const session = event.data.object as Stripe.Checkout.Session;
          const payment = await this.paymentModel.findOne({ sessionId: session.id });
          if (payment) {
            payment.status = PaymentStatus.EXPIRED;
            payment.updated_at = new Date();
            await payment.save();
          }
          break;
        }
        case 'charge.succeeded': {
          const charge = event.data.object as Stripe.Charge;
          const payment = await this.paymentModel.findOne({ sessionId: charge.payment_intent });
          if (payment) {
            payment.status = PaymentStatus.SUCCEEDED;
            payment.updated_at = new Date();
            await payment.save();
          }
          break;
        }
        case 'charge.updated': {
          const charge = event.data.object as Stripe.Charge;
          const payment = await this.paymentModel.findOne({ sessionId: charge.payment_intent });
          if (payment) {
            payment.updated_at = new Date();
            await payment.save();
          }
          break;
        }
        case 'charge.failed': {
          const charge = event.data.object as Stripe.Charge;
          const payment = await this.paymentModel.findOne({ sessionId: charge.payment_intent });
          if (payment) {
            payment.status = PaymentStatus.FAILED;
            payment.updated_at = new Date();
            await payment.save();
          }
          break;
        }
        default:
          this.logger.warn(`Unhandled event type: ${event.type}`);
      }
    } catch (error) {
      this.logger.error(`Error handling webhook event ${event.type}`, error);
      throw new BadRequestException(`Webhook error: ${error.message}`);
    }
  }
}