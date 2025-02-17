import { Module } from '@nestjs/common'
import { HealthController, HealthService } from './modules/health'

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {}
