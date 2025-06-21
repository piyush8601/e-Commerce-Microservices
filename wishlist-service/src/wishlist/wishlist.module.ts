import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { Wishlist, WishlistSchema } from './schemas/wishlist.schema';
import { ProductService } from '../product/services/product.service';
import { ProductGrpcService } from '../product/services/product-grpc.service';
import { AuthService } from '../auth/services/auth.service';
import { AuthGrpcService } from '../auth/services/auth-grpc.service';
import { CartGrpcService } from './services/cart-grpc.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wishlist.name, schema: WishlistSchema }]),
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: join(process.cwd(), 'src/proto/product.proto'),
          url: process.env.PRODUCT_SERVICE_URL || '0.0.0.0:5001',
        },
      },
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(process.cwd(), 'src/proto/auth.proto'),
          url: process.env.AUTH_SERVICE_URL || '0.0.0.0:5052',
        },
      },
      {
        name: 'CART_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'cart',
          protoPath: join(process.cwd(), 'src/proto/cart.proto'),
          url: process.env.CART_SERVICE_URL || '0.0.0.0:5003',
        },
      },
    ]),
  ],
  controllers: [WishlistController],
  providers: [
    WishlistService,
    ProductService,
    ProductGrpcService,
    AuthService,
    AuthGrpcService,
    CartGrpcService,
  ],
  exports: [WishlistService],
})
export class WishlistModule {} 