import { beforeEach, describe, expect, it } from 'bun:test'
import { Test, type TestingModule } from '@nestjs/testing'
import { HealthController } from './controller'
import { HealthService } from './service'

describe('AppController', () => {
  let appController: HealthController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile()

    appController = app.get<HealthController>(HealthController)
  })

  describe('root', () => {
    it('should return "ok"', () => {
      expect(appController.health()).toBe('ok')
    })
  })
})
