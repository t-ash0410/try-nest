import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional } from 'class-validator'

@InputType()
export class CreateTicketInput {
  @IsNotEmpty()
  @Field()
  title: string

  @IsOptional()
  @Field({ nullable: true })
  description?: string

  @IsOptional()
  @Field({ nullable: true })
  deadline?: Date
}
