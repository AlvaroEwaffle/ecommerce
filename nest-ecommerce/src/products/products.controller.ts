import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put, ForbiddenException, LoggerService, Inject, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FakerService } from './faker.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {  WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('products') // Tag for Swagger documentation
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly fakerService: FakerService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) { }

  // Endpoint to create a new product
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('premium', 'admin')
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBearerAuth() // Requires JWT Bearer token authentication
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request: Missing or invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized: User not authenticated.' })
  @ApiResponse({ status: 403, description: 'Forbidden: User does not have permission to create products.' })
  async create(@Body() createProductDto: CreateProductDto, @Request() req) {
    this.logger.debug('Creating a new product', ProductsController.name);
    const user = req.user;
    if (user.role !== 'premium' && user.role !== 'admin') {
      this.logger.error('Only premium and admin users can create products', ProductsController.name);
      throw new ForbiddenException('Only premium users can create products');
    }
    return this.productsService.create(createProductDto, user.id);
  }

  // Endpoint to fetch all products with pagination
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiBearerAuth() // Requires JWT Bearer token authentication
  @ApiQuery({ name: 'page', type: 'number', required: false, description: 'Page number for pagination.' })
  @ApiQuery({ name: 'limit', type: 'number', required: false, description: 'Number of items per page.' })
  async findAll(@Query('page') page: number, @Query('limit') limit: number): Promise<any> {
    return this.productsService.findAll(page, limit);
  }

  // Endpoint to generate mock products
  @UseGuards(JwtAuthGuard)
  @Post('/mockingproducts/')
  @ApiOperation({ summary: 'Generate mock products' })
  @ApiBearerAuth() // Requires JWT Bearer token authentication
  @ApiBody({ type: Number, description: 'Number of mock products to generate.' })
  @ApiResponse({ status: 200, description: 'Mock products generated successfully.' })
  async generateProducts(@Body('number') number: number = 100): Promise<any> {
    return this.fakerService.generateProduct(number);
  }

  // Endpoint to find a product by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiBearerAuth() // Requires JWT Bearer token authentication
  @ApiParam({ name: 'id', type: 'string', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product found.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // Endpoint to update a product by ID
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiBearerAuth() // Requires JWT Bearer token authentication
  @ApiParam({ name: 'id', type: 'string', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request: Missing or invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized: User not authenticated.' })
  @ApiResponse({ status: 403, description: 'Forbidden: User does not have permission to update products.' })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Request() req) {
    const user = req.user;
    return this.productsService.update(id, updateProductDto, user);
  }

  // Endpoint to delete a product by ID
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiBearerAuth() // Requires JWT Bearer token authentication
  @ApiParam({ name: 'id', type: 'string', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized: User not authenticated.' })
  @ApiResponse({ status: 403, description: 'Forbidden: User does not have permission to delete products.' })
  async remove(@Param('id') id: string, @Request() req) {
    const user = req.user;
    return this.productsService.remove(id, user);
  }
}
