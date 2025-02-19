import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional } from 'class-validator'

@InputType()
export class UpdateTicketInput {
  @Field(() => Int)
  ticketId: number

  @IsNotEmpty()
  @IsOptional()
  @Field({ nullable: true })
  title?: string

  @IsOptional()
  @Field({ nullable: true })
  description?: string

  @IsOptional()
  @Field({ nullable: true })
  deadline?: Date
}
