// ticket.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>) {}

  async createTicket(purchaser: string, amount: number): Promise<Ticket> {
    const newTicket = new this.ticketModel({ purchaser, amount });
    return newTicket.save();
  }
}
