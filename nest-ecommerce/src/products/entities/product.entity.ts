import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ default: 'admin', required: true })
  owner: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: true })
  status: boolean;

  @Prop({ required: true })
  stock: number;

  @Prop([String])
  thumbnails: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
