import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  mock,
  setSystemTime,
  spyOn,
} from 'bun:test'
import { DOMAIN } from '@backend/lib/env'
import { Test, type TestingModule } from '@nestjs/testing'
import { Response } from 'express'
import { AuthController } from './controller'
import { AuthService } from './service'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile()

    controller = app.get<AuthController>(AuthController)

    let callCount = 0
    spyOn(crypto, 'randomUUID').mockImplementation(() => {
      callCount++
      return callCount === 1
        ? '01c7d146-98ca-4f90-86ae-e7bbc3578115'
        : '97cd3472-8e3d-4b61-86f5-30668ce28ec2'
    })

    setSystemTime(new Date('2025-02-17T22:00:00Z'))
  })

  afterEach(() => {
    mock.restore()
  })

  describe('root', () => {
    it('should return "ok"', () => {
      const res = {
        cookie: mock(() => {}),
      } as unknown as Response

      expect(controller.session(res)).toMatchInlineSnapshot(`
        {
          "expires": 2025-02-17T22:10:00.000Z,
          "nonce": "97cd3472-8e3d-4b61-86f5-30668ce28ec2",
          "state": "01c7d146-98ca-4f90-86ae-e7bbc3578115",
        }
      `)

      expect(res.cookie).toHaveBeenCalledTimes(2)
      expect(res.cookie).toHaveBeenNthCalledWith(
        1,
        'state',
        '01c7d146-98ca-4f90-86ae-e7bbc3578115',
        {
          signed: false,
          expires: new Date('2025-02-17T22:10:00.000Z'),
          path: '/',
          secure: true,
          domain: DOMAIN,
          httpOnly: true,
          sameSite: 'strict',
        },
      )
      expect(res.cookie).toHaveBeenNthCalledWith(
        2,
        'nonce',
        '97cd3472-8e3d-4b61-86f5-30668ce28ec2',
        {
          signed: false,
          expires: new Date('2025-02-17T22:10:00.000Z'),
          path: '/',
          secure: true,
          domain: DOMAIN,
          httpOnly: true,
          sameSite: 'strict',
        },
      )
    })
  })
})
