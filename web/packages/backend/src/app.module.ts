import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { AuthController } from './modules/auth/auth.controller'
import { AuthService } from './modules/auth/auth.service'
import { HealthController } from './modules/health/health.controller'
import { HealthService } from './modules/health/health.service'
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
