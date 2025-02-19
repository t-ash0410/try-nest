import { db } from '@backend/lib/db'
import { Injectable } from '@nestjs/common'
import { Ticket } from '@prisma/client'
import { CreateTicketInput } from './dto/create-ticket.dto'
import { DeleteTicketInput } from './dto/delete-ticket.dto'
import { UpdateTicketInput } from './dto/update-ticket.dto'

@Injectable()
export class TicketService {
  getTickets(userId: number): Promise<Ticket[]> {
    return db.ticket.findMany({
      where: {
        authorId: userId,
      },
    })
  }

  getTicket(userId: number, ticketId: number): Promise<Ticket> {
    return db.ticket.findUniqueOrThrow({
      where: {
        authorId: userId,
        ticketId,
      },
    })
  }

  createTicket(userId: number, input: CreateTicketInput): Promise<Ticket> {
    const { title, description, deadline } = input

    return db.ticket.create({
      data: {
        title,
        description,
        deadline,
        authorId: userId,
      },
    })
  }

  updateTicket(userId: number, input: UpdateTicketInput): Promise<Ticket> {
    const { ticketId, title, description, deadline } = input

    return db.ticket.update({
      data: {
        title: title || undefined,
        description: description || undefined,
        deadline: deadline || undefined,
      },
      where: {
        ticketId,
        authorId: userId,
      },
    })
  }

  deleteTicket(userId: number, input: DeleteTicketInput): Promise<Ticket> {
    const { ticketId } = input

    return db.ticket.delete({
      where: {
        ticketId,
        authorId: userId,
      },
    })
  }
}
