import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class DeleteTicketInput {
  @Field(() => Int)
  ticketId: number
}
