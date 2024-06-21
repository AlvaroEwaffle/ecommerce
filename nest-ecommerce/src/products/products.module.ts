// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { FakerService } from './faker.service';
import { ProductsController } from './products.controller';
import { ProductSchema } from './entities/product.entity';
import { CartSchema} from '../carts/entities/cart.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }, { name: 'Cart', schema: CartSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, FakerService],
})
export class ProductsModule {}
