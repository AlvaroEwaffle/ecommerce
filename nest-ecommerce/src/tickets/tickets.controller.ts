// ticket.controller.ts

import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TicketService } from './tickets.service';

@Controller('carts')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(JwtAuthGuard)
  @Post('purchase')
  async purchaseCart(@Req() req: Request, @Res() res: Response) {
    try {
      const { purchaser } = req.body;
      const { amount } = req.body; // Assuming amount is sent in the request body
      const purchaseResult = await this.ticketService.createTicket(purchaser, amount);
      res.status(200).json(purchaseResult);
    } catch (error) {
      console.error('Error purchasing cart:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
