import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put, ForbiddenException, LoggerService, Inject, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FakerService } from './faker.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {  WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly fakerService: FakerService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService

  ) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('premium','admin')
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Request() req) {
    this.logger.debug('Creating a new product', ProductsController.name);
    const user = req.user;
    if (user.role !== 'premium' && user.role !== 'admin') {
      this.logger.error('Only premium and admin users can create products', ProductsController.name);
      throw new ForbiddenException('Only premium users can create products');
    }
    return this.productsService.create(createProductDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query('page') page: number, @Query('limit') limit: number): Promise<any> {
    return this.productsService.findAll(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/mockingproducts/')
  async generateProducts(@Body('number') number: number = 100): Promise<any> {
    return this.fakerService.generateProduct(number);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Request() req) {
    const user = req.user;
    return this.productsService.update(id, updateProductDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const user = req.user;
    return this.productsService.remove(id, user);
  }
}
