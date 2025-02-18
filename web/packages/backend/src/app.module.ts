import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthController, AuthService } from './modules/auth'
import { HealthController, HealthService } from './modules/health'

@Module({
  imports: [],
  controllers: [HealthController, AuthController],
  providers: [HealthService, AuthService, JwtService],
})
export class AppModule {}
