import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { AuthController, AuthService } from './modules/auth'
import { HealthController, HealthService } from './modules/health'
import { TicketModule } from './modules/ticket/ticket.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    TicketModule,
  ],
  controllers: [HealthController, AuthController],
  providers: [HealthService, AuthService, JwtService],
})
export class AppModule {}
