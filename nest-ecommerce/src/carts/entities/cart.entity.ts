import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [
      {
        productId: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
      },
    ],
  })
  products: { productId: MongooseSchema.Types.ObjectId; quantity: number }[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: true })
  active: boolean;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

