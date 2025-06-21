import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum PaymentStatus {
  REQUIRES_PAYMENT_METHOD = 'REQUIRES_PAYMENT_METHOD',
  PENDING = 'PENDING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
  REFUNDED = 'REFUNDED',
}

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  sessionId: string;

  @Prop()
  refund_id?: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ enum: PaymentStatus, default: PaymentStatus.REQUIRES_PAYMENT_METHOD })
  status: PaymentStatus;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

export type PaymentDocument = Payment & Document;