import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentService } from './service';
import { PaymentGrpcService } from './grpc.controller';
import { PaymentController } from './payment.controller';
import { Payment, PaymentSchema } from './schema';

@Module({
  imports: [
MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  controllers: [PaymentController,PaymentGrpcService],
  providers: [PaymentService,PaymentGrpcService],
  exports: [PaymentService,PaymentGrpcService], 
})
export class PaymentModule {}
