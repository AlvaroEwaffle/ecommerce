import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './entities/ticket.entity';
import { TicketService } from './tickets.service';
import { TicketController } from './tickets.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }])
  ],
  providers: [TicketService],
  controllers: [TicketController]
})
export class TicketModule {}
