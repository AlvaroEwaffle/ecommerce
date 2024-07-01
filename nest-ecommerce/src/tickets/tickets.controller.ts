import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TicketService } from './tickets.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('tickets') // Tag for Swagger documentation
@Controller('carts')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  // Endpoint to purchase a ticket
  @UseGuards(JwtAuthGuard)
  @Post('purchase')
  @ApiOperation({ summary: 'Purchase a ticket' })
  @ApiBearerAuth() // Requires JWT Bearer token authentication
  @ApiBody({ 
    schema: {
      properties: {
        purchaser: { type: 'string', example: 'John Doe', description: 'Name of the purchaser' },
        amount: { type: 'number', example: 100, description: 'Amount for the ticket purchase' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Ticket purchased successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request: Missing or invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized: User not authenticated.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async purchaseCart(@Req() req: Request, @Res() res: Response) {
    try {
      const { purchaser, amount } = req.body;
      const purchaseResult = await this.ticketService.createTicket(purchaser, amount);
      res.status(200).json(purchaseResult);
    } catch (error) {
      console.error('Error purchasing ticket:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
