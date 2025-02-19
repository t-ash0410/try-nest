import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TicketModel {
  @Field(() => Int)
  ticketId: number

  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  deadline?: Date

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
