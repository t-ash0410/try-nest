import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SessionModel {
  @Field(() => Int)
  userId: number
}
