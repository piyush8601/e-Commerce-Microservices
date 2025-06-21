import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

interface CartService {
  addItemsToCart(request: {
    userId: string;
    items: Array<{
      productId: string;
      quantity: number;
    }>;
  }): Promise<{ success: boolean; message: string }>;
}

@Injectable()
export class CartGrpcService {
  private readonly logger = new Logger(CartGrpcService.name);
  private cartService: CartService;

  constructor(@Inject('CART_PACKAGE') private client: ClientGrpc) {
    try {
      this.cartService = this.client.getService<CartService>('CartService');
      if (!this.cartService) {
        throw new Error('CartService not found in gRPC client');
      }
      this.logger.log('CartService successfully initialized');
    } catch (error) {
      this.logger.error(`Failed to initialize CartService: ${error.message}`, error.stack);
      throw error;
    }
  }

  async addItemsToCart(userId: string, items: Array<{ productId: string; quantity: number }>) {
    try {
      this.logger.debug(`Attempting to add items to cart for userId: ${userId}`);
      this.logger.debug(`Items to add: ${JSON.stringify(items)}`);
      
      const result = await this.cartService.addItemsToCart({ userId, items });
      this.logger.debug(`Cart service response: ${JSON.stringify(result)}`);
      
      return result;
    } catch (error) {
      this.logger.error(`gRPC call to addItemsToCart failed: ${error.message}`, error.stack);
      throw error;
    }
  }
} 