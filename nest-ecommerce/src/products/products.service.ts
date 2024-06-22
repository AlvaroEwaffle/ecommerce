// src/products/products.service.ts
import { Inject, Injectable, NotFoundException, LoggerService, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { User } from '../users/entities/user.entity';
import { Cart } from '../carts/entities/cart.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel('Cart') private cartModel: Model<Cart>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) { }


  async create(createProductDto: CreateProductDto, owner: string): Promise<Product> {
    console.log('createProductDto', createProductDto);
    const product = await new this.productModel(createProductDto);
    product.owner = owner;
    console.log(product);
    try {
      return product.save();
    }
    catch (error) {
      console.log(error);
    }

  }

  async findAll(page: number = 1, limit: number = 10): Promise<Product[]> {
    const skip = (page - 1) * limit;
    return this.productModel.find().skip(skip).limit(limit).exec();
  }

  async findOne(id: string): Promise<Product> {
    this.logger.debug(`Fetching product with id: ${id}`, ProductsService.name);
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: User): Promise<Product> {
    this.logger.debug(`Updating product with id: ${id}`, ProductsService.name);
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    if (user.role !== 'admin' && product.owner.toString() !== user._id.toString()) {
      // You can only update your own products
      this.logger.error('You do not have permission to update this product', ProductsService.name);
      throw new ForbiddenException('You do not have permission to update this product');
    }
    Object.assign(product, updateProductDto);
    return product.save();
  }


  async remove(id: string, user: User): Promise<Product> {
    this.logger.debug(`Removing product with id: ${id}`, ProductsService.name);

    const product = await this.productModel.findById(id);
    if (!product) {
      this.logger.error(`Product #${id} not found`, ProductsService.name);
      throw new NotFoundException(`Product #${id} not found`);
    }

    // Check permissions
    if (user.role !== 'admin' && user.role !== 'premium') {
      this.logger.error('You do not have permission to delete this product', ProductsService.name);
      throw new ForbiddenException('You do not have permission to delete this product');
    }

    if (user.role === 'premium' && product.owner.toString() !== user._id.toString()) {
      this.logger.error('Premium users can only delete their own products', ProductsService.name);
      throw new ForbiddenException('Premium users can only delete their own products');
    }

    // Remove the product from all carts
    await this.cartModel.updateMany(
      { 'products.productId': product._id },
      { $pull: { 'products': { 'productId': product._id } } }
    );

    return this.productModel.findByIdAndDelete(id).exec();
  }
}
