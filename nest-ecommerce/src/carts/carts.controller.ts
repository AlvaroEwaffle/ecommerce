// carts.controller.ts

import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Cart[]> {
    return this.cartsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Cart> {
    return this.cartsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body('userId') userId: string): Promise<Cart> {
    return this.cartsService.create(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':cartId/products/:productId')
  async addProduct(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ): Promise<Cart> {
    console.log(cartId, productId, quantity);
    return this.cartsService.addProduct(cartId, productId, quantity);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Cart> {
    return this.cartsService.delete(id);
  }
}
