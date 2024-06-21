import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop({ default: () => uuidv4(), unique: true })
  code: string;

  @Prop({ default: Date.now })
  purchase_datetime: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  purchaser: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
