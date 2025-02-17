import { Controller, Get } from '@nestjs/common'
import { HealthService } from './service'

@Controller()
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @Get('/health')
  health(): string {
    return this.service.getHealth()
  }
}
