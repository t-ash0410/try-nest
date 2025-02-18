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
import { dummyUser } from '@backend/fixtures'
import { db } from '@backend/lib/db'
import {
  DOMAIN,
  JWT_KEY,
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  SLACK_SSO_REDIRECT_URL,
} from '@backend/lib/env'
import { JwtService } from '@nestjs/jwt'
import { Test, type TestingModule } from '@nestjs/testing'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { JWTVerifyResult, ResolvedKey, createRemoteJWKSet } from 'jose'
import { AuthController } from './controller'
import { AuthService } from './service'

describe('/oidc/session', () => {
  let controller: AuthController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService],
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

  it('should return session', () => {
    const res = {
      cookie: mock(() => {}),
    } as unknown as ExpressResponse

    expect(controller.oidcSession(res)).toMatchInlineSnapshot(`
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

describe('/oidc/slack', () => {
  const SLACK_SSO_URL = 'https://slack.com/api/openid.connect.token'
  const now = new Date('2025-02-17T22:00:00Z')

  let controller: AuthController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService],
    }).compile()

    controller = app.get<AuthController>(AuthController)

    setSystemTime(now)

    mock.module('jose', () => {
      return {
        createRemoteJWKSet: createRemoteJWKSet,
        jwtVerify: () => {
          const jwt: JWTVerifyResult & ResolvedKey = {
            key: {
              type: 'some-key-type',
            },
            payload: {
              email: 'john-doe@example.com',
              name: 'John Doe',
              sub: 'UXXXXXXX',
              'https://slack.com/team_id': 'TXXXXXXX',
              access_token: 'xxxx-xxxxx.xxxx',
              picture: 'http://localhost/profile/image',
              nonce: 'nonce',
            },
            protectedHeader: {
              alg: '',
            },
          }
          return jwt
        },
      }
    })
    spyOn(global, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          ok: true,
          id_token: 'x-xxxxxx.xxxxxx',
        }),
      ),
    )
    mock.module('@backend/lib/db', () => {
      return {
        db: {
          user: {
            findFirst: mock(() => dummyUser),
            create: mock(() => dummyUser),
          },
        },
      }
    })
  })

  afterEach(() => {
    mock.restore()
  })

  it('should return token', async () => {
    const req = {
      params: {
        state: 'state',
        code: 'code',
      },
      cookies: {
        state: 'state',
        nonce: 'nonce',
      },
    } as unknown as ExpressRequest

    const res = {
      cookie: mock(() => {}),
      clearCookie: mock(() => {}),
    } as unknown as ExpressResponse

    expect(await controller.oidcSlack(req, res)).toMatchInlineSnapshot(`
      {
        "slackTeamId": "TXXXXX",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczOTgyOTYwMCwiZXhwIjoxNzM5ODQwNDAwLCJpc3MiOiJsb2NhbGhvc3QifQ.xvkTO51W8XqKth_zhOHMYWkQ2S15NM_3eCP4X9VYmFE",
      }
    `)

    expect(res.cookie).toHaveBeenCalledTimes(1)
    expect(res.cookie).toHaveBeenNthCalledWith(
      1,
      JWT_KEY,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczOTgyOTYwMCwiZXhwIjoxNzM5ODQwNDAwLCJpc3MiOiJsb2NhbGhvc3QifQ.xvkTO51W8XqKth_zhOHMYWkQ2S15NM_3eCP4X9VYmFE',
      {
        signed: false,
        expires: new Date('2025-02-18T01:00:00.000Z'),
        path: '/',
        secure: true,
        domain: DOMAIN,
        httpOnly: true,
        sameSite: 'strict',
      },
    )

    expect(res.clearCookie).toHaveBeenCalledTimes(2)
    expect(res.clearCookie).toHaveBeenNthCalledWith(1, 'state', {
      path: '/',
      secure: true,
      domain: DOMAIN,
      httpOnly: true,
      sameSite: 'strict',
    })
    expect(res.clearCookie).toHaveBeenNthCalledWith(2, 'nonce', {
      path: '/',
      secure: true,
      domain: DOMAIN,
      httpOnly: true,
      sameSite: 'strict',
    })

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenNthCalledWith(1, SLACK_SSO_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: SLACK_CLIENT_ID,
        client_secret: SLACK_CLIENT_SECRET,
        code: 'code',
        redirect_uri: SLACK_SSO_REDIRECT_URL,
      }),
    })

    expect(db.user.findFirst).toHaveBeenCalledTimes(1)
    expect(db.user.findFirst).toHaveBeenNthCalledWith(1, {
      where: {
        email: 'john-doe@example.com',
      },
    })

    expect(db.user.create).not.toHaveBeenCalled()
  })
})
