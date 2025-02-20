import { DOMAIN, JWT_KEY } from '@backend/lib/env'
import { UseGuards } from '@nestjs/common'
import {
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql'
import { GqlUser } from '../common/decorators/user.decorator'
import { GqlAuthGuard } from '../common/guards/gql.guard'
import { SessionModel } from './session.model'

@Resolver()
@UseGuards(GqlAuthGuard)
export class SessionResolver {
  @Query(() => SessionModel, { nullable: true })
  async session(@GqlUser() user): Promise<{ userId: number }> {
    return {
      userId: user.userId,
    }
  }

  @Mutation(() => SessionModel)
  async deleteSession(
    @GqlUser() user,
    @Context() context: GraphQLExecutionContext,
  ): Promise<{ userId: number }> {
    context.getContext().res.clearCookie(JWT_KEY, {
      path: '/',
      secure: true,
      domain: DOMAIN,
      httpOnly: true,
      sameSite: 'strict',
    })
    return {
      userId: user.userId,
    }
  }
}
