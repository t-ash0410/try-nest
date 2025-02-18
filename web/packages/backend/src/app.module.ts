import { Module } from '@nestjs/common'
import { AuthController, AuthService } from './modules/auth'
import { HealthController, HealthService } from './modules/health'

@Module({
  imports: [],
  controllers: [HealthController, AuthController],
  providers: [HealthService, AuthService],
})
export class AppModule {}
