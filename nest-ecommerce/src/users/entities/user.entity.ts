import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 'user', enum: ['user', 'premium', 'admin'] })
  role: string;

  @Prop({ default: null })
  cartid: string;

  @Prop()
  resetToken: string;

  @Prop()
  resetTokenExpires: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
