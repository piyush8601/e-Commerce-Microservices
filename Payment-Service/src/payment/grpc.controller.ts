import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PaymentService } from './service';
import { CreateCheckoutSessionDto } from './create-checkout-session';
import { CreateRefundDto } from './create-refund-data';
import {
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse,
  CreateRefundRequest,
  CreateRefundResponse,
} from './interfaces';

@Controller()
export class PaymentGrpcService {
  constructor(private readonly paymentService: PaymentService) {}

  @GrpcMethod('PaymentService', 'CreateCheckoutSession')
  async createCheckoutSession(
    data: CreateCheckoutSessionRequest,
    // metadata: Metadata,
    // call: ServerUnaryCall<CreateCheckoutSessionRequest, CreateCheckoutSessionResponse>,
  ): Promise<CreateCheckoutSessionResponse> {
    console.log(data);
    const payload: CreateCheckoutSessionDto = {
      orderId: data.orderId,
      amount: data.amount,
      currency: data.currency,
    };
    return await this.paymentService.createCheckoutSession(payload);
  }

  @GrpcMethod('PaymentService', 'CreateRefund')
  async createRefund(
    data: CreateRefundRequest,
    metadata: Metadata,
    call: ServerUnaryCall<CreateRefundRequest, CreateRefundResponse>,
  ): Promise<CreateRefundResponse> {
    const payload: CreateRefundDto = {
      orderId: data.orderId,
      sessionId: data.sessionId,
    };
    return await this.paymentService.createRefund(payload);
  }
}