import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './schemas/cart.schema';
import { AuthService } from '../middleware/services/auth.service';
import { AuthGrpcService } from '../middleware/services/auth-grpc.service';
import { ProductService } from '../product/services/product.service';
import { ProductGrpcService } from '../product/services/product-grpc.service';
import { CartGrpcService } from './grpc/cart.grpc.service';
import { CartGrpcController } from './grpc/cart.grpc.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'auth',
            protoPath: join(__dirname, '../../src/proto/auth.proto'),
            url: configService.get<string>('AUTH_GRPC_SERVICE'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'PRODUCT_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'product',
            protoPath: join(__dirname, '../../src/proto/product.proto'),
            url: configService.get<string>('PRODUCT_GRPC_SERVICE'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [CartController, CartGrpcController],
  providers: [CartService, AuthService, AuthGrpcService, ProductService, ProductGrpcService, CartGrpcService],
  exports: [CartService],
})
export class CartModule {} 