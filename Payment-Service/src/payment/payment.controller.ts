import { Controller, Post, Req, RawBodyRequest, BadRequestException } from '@nestjs/common';
import { PaymentService } from './service';
import Stripe from 'stripe';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('webhook')
  async handleWebhook(@Req() request: RawBodyRequest<Request>): Promise<void> {
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' });
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-05-28.basil' });

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    const sig = request.headers['stripe-signature'] as string;
    const rawBody = request.rawBody;

    try {
      const event = stripe.webhooks.constructEvent(rawBody as Buffer, sig, endpointSecret);
      await this.paymentService.handleWebhook(event);
    } catch (error) {
      throw new BadRequestException(`Webhook error: ${error.message}`);
    }
  }
}