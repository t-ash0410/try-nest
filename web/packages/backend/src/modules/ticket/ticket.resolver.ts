import { GqlUser } from '@backend/modules/common/decorators/user.decorator'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Ticket } from '@prisma/client'
import { GqlAuthGuard } from '../common/guards/gql.guard'
import { CreateTicketInput } from './dto/create-ticket.dto'
import { DeleteTicketInput } from './dto/delete-ticket.dto'
import { UpdateTicketInput } from './dto/update-ticket.dto'
import { TicketModel } from './ticket.models'
import { TicketService } from './ticket.service'

@Resolver()
@UseGuards(GqlAuthGuard)
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  @Query(() => [TicketModel], { nullable: true })
  async getTickets(@GqlUser() user): Promise<Ticket[]> {
    return await this.ticketService.getTickets(user.userId)
  }

  @Mutation(() => TicketModel)
  async create(
    @GqlUser() user,
    @Args('input') input: CreateTicketInput,
  ): Promise<Ticket> {
    return await this.ticketService.createTicket(user.userId, input)
  }

  @Mutation(() => TicketModel)
  async update(
    @GqlUser() user,
    @Args('input') input: UpdateTicketInput,
  ): Promise<Ticket> {
    return await this.ticketService.updateTicket(user.userId, input)
  }

  @Mutation(() => TicketModel)
  async delete(
    @GqlUser() user,
    @Args('input') input: DeleteTicketInput,
  ): Promise<Ticket> {
    return await this.ticketService.deleteTicket(user.userId, input)
  }
}
