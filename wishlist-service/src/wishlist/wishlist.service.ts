import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wishlist, WishlistDocument } from './schemas/wishlist.schema';
import { AddToCartDto } from './dto/AddToCartDto';
import { ProductService } from '../product/services/product.service';
import { Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CartGrpcService } from './services/cart-grpc.service';

@Injectable()
export class WishlistService {
  private readonly logger = new Logger(WishlistService.name);

  constructor(
    @InjectModel(Wishlist.name) private wishlistModel: Model<WishlistDocument>,
    private productService: ProductService,
    private readonly cartGrpcService: CartGrpcService,
  ) {}

  async getWishlist(userId: string): Promise<Wishlist> {
    const wishlist = await this.findWishlistByUserId(userId);
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }
    return wishlist;
  }

  async addItem(userId: string, addItemDto: AddToCartDto): Promise<Wishlist> {
    const product = await this.getProductDetails(addItemDto.productId);
    let wishlist = await this.findWishlistByUserId(userId);

    if (!wishlist) {
      wishlist = await this.createNewWishlist(userId);
    }

    const existingItem = wishlist.items.find(item => item.productId === addItemDto.productId);
    if (existingItem) {
      throw new BadRequestException('Item already exists in wishlist');
    }

    wishlist.items.push({
      productId: addItemDto.productId,
      name: product.name,
      price: product.price,
      image: product.imageUrl || '',
    });

    return this.saveWishlist(wishlist);
  }

  async removeItem(userId: string, productId: string): Promise<Wishlist> {
    const wishlist = await this.findWishlistByUserId(userId);
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }

    const itemIndex = wishlist.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in wishlist');
    }

    wishlist.items.splice(itemIndex, 1);
    return this.saveWishlist(wishlist);
  }

  async clearWishlist(userId: string): Promise<Wishlist> {
    const wishlist = await this.findWishlistByUserId(userId);
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }

    wishlist.items = [];
    return this.saveWishlist(wishlist);
  }

  private async findWishlistByUserId(userId: string): Promise<WishlistDocument | null> {
    return this.wishlistModel.findOne({ userId }).exec();
  }

  private async createNewWishlist(userId: string): Promise<WishlistDocument> {
    return new this.wishlistModel({
      userId,
      items: [],
    });
  }

  private async saveWishlist(wishlist: WishlistDocument): Promise<Wishlist> {
    return wishlist.save();
  }

  private async getProductDetails(productId: string) {
    try {
      const response = await lastValueFrom(this.productService.getProduct(productId));
      
      if (response.code !== 200) {
        throw new NotFoundException('Product not found');
      }

      const productData = JSON.parse(response.data);
      if (!productData || !productData.name || !productData.price) {
        throw new BadRequestException('Invalid product data format');
      }

      return {
        name: productData.name,
        price: productData.price,
        imageUrl: productData.imageUrl || '',
      };
    } catch (error) {
      this.logger.error(`Failed to fetch product details: ${error.message}`);
      throw new BadRequestException('Failed to fetch product details');
    }
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<any> {
    try {
      this.logger.debug(`Starting addToCart process for userId: ${userId}, productId: ${addToCartDto.productId}`);
      
      // Get product details
      const product = await this.getProductDetails(addToCartDto.productId);
      this.logger.debug(`Product details retrieved: ${JSON.stringify(product)}`);
      
      // Prepare cart item
      const cartItem = {
        productId: addToCartDto.productId,
        quantity: addToCartDto.quantity || 1
      };
      this.logger.debug(`Prepared cart item: ${JSON.stringify(cartItem)}`);

      // Make gRPC call to cart service
      this.logger.debug('Attempting to make gRPC call to cart service...');
      const result = await this.cartGrpcService.addItemsToCart(userId, [cartItem]);
      this.logger.debug(`Cart service response: ${JSON.stringify(result)}`);
      
      if (result.success) {
        // If successful, remove item from wishlist
        this.logger.debug('Cart addition successful, removing item from wishlist...');
        await this.removeItem(userId, addToCartDto.productId);
        return { success: true, message: 'Item added to cart successfully' };
      } else {
        this.logger.error(`Cart service returned error: ${result.message}`);
        throw new BadRequestException(result.message || 'Failed to add item to cart');
      }
    } catch (error) {
      this.logger.error(`Failed to add item to cart: ${error.message}`, error.stack);
      throw new BadRequestException(error.message || 'Failed to add item to cart');
    }
  }
}


