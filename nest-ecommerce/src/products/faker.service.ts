import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FakerService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) {

    }
    async generateProduct(number: number): Promise<Product[]> {
        const products: Product[] = [];

        for (let i = 0; i < number; i++) {
            const product = {
                title: faker.commerce.productName(),
                description: faker.lorem.paragraph(),
                code: faker.string.alphanumeric(8),
                price: faker.number.int({ min: 10, max: 1000 }),
                status: true,
                stock: faker.number.int({ min: 0, max: 100 }),
                thumbnails: [faker.image.url()],
            }

            const newProduct = new this.productModel(product);
            products.push(await newProduct.save());
        }

        return products;
    };
}

    
