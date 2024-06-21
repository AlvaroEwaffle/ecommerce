import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './entities/cart.entity';
import { Product, ProductDocument } from '../products/entities/product.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<Cart[]> {
    return this.cartModel.find().exec();
  }

  async findById(id: string): Promise<Cart> {
    return this.cartModel
      .findById(id)
      .populate('products.productId')  // Populate product details
      .exec();
  }

  async create(userId: string): Promise<Cart> {
    const newCart = new this.cartModel({ userId });
    return newCart.save();
  }

  async addProduct(cartId: string, productId: string, quantity: number = 1): Promise<Cart> {
    const cart = await this.cartModel.findById(cartId).exec();
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const productObjectId = product._id as any;

    const existingProductIndex = cart.products.findIndex(p => p.productId.toString() === productObjectId.toString(productObjectId));
    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ productId: productObjectId, quantity });
    }

    return cart.save();
  }

  async delete(cartId: string): Promise<Cart> {
    return this.cartModel.findByIdAndDelete(cartId).exec();
  }
}