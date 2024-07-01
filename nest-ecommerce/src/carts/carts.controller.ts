import { Controller, Get, Param, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('carts') // Tag for Swagger documentation
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  // Endpoint to fetch all carts
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all carts' })
  @ApiResponse({ status: 200, description: 'List of all carts.', type: [Cart] })
  async findAll(): Promise<Cart[]> {
    return this.cartsService.findAll();
  }

  // Endpoint to find a cart by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a cart by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Cart ID' })
  @ApiResponse({ status: 200, description: 'Cart found.', type: Cart })
  @ApiResponse({ status: 404, description: 'Cart not found.' })
  async findById(@Param('id') id: string): Promise<Cart> {
    return this.cartsService.findById(id);
  }

  // Endpoint to create a new cart
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new cart' })
  @ApiBody({ type: String, description: 'User ID to associate with the new cart.' })
  @ApiResponse({ status: 201, description: 'Cart created successfully.', type: Cart })
  async create(@Body('userId') userId: string): Promise<Cart> {
    return this.cartsService.create(userId);
  }

  // Endpoint to add a product to a cart
  @UseGuards(JwtAuthGuard)
  @Post(':cartId/products/:productId')
  @ApiOperation({ summary: 'Add a product to a cart' })
  @ApiParam({ name: 'cartId', type: 'string', description: 'Cart ID' })
  @ApiParam({ name: 'productId', type: 'string', description: 'Product ID' })
  @ApiBody({ type: Number, description: 'Quantity of the product to add.' })
  @ApiResponse({ status: 200, description: 'Product added to cart successfully.', type: Cart })
  async addProduct(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ): Promise<Cart> {
    console.log(cartId, productId, quantity);
    return this.cartsService.addProduct(cartId, productId, quantity);
  }

  // Endpoint to delete a cart by ID
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Cart ID' })
  @ApiResponse({ status: 200, description: 'Cart deleted successfully.', type: Cart })
  async delete(@Param('id') id: string): Promise<Cart> {
    return this.cartsService.delete(id);
  }
}
