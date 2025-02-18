import { db } from '@backend/lib/db'
import {
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  SLACK_SSO_REDIRECT_URL,
} from '@backend/lib/env'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { JWTPayload, createRemoteJWKSet, jwtVerify } from 'jose'
import { z } from 'zod'

type getSessionResult = {
  state: string
  nonce: string
  expires: Date
}

type execSsoInput = {
  params: {
    state: string
    code: string
  }
  cookie: {
    state: string
    nonce: string
  }
}

type execSsoResult = {
  user: User
}

@Injectable()
export class AuthService {
  private SLACK_SSO_URL = 'https://slack.com/api/openid.connect.token'
  private SLACK_JWK_URL = 'https://slack.com/openid/connect/keys'
  private SLACK_JWT_ISSUER = 'https://slack.com'

  getSession(): getSessionResult {
    const expires = new Date()
    expires.setMinutes(expires.getMinutes() + 10)

    return {
      state: crypto.randomUUID(),
      nonce: crypto.randomUUID(),
      expires,
    }
  }

  async execSso(input: execSsoInput): Promise<execSsoResult> {
    this.checkState(input)

    const res = await this.getSlackJWT(input.params.code)
    const token = await this.convertTokenResponse(res)
    const payload = await this.verifyAndDecode(token, input)
    const user = await this.getOrCreateUser(payload)

    return {
      user,
    }
  }

  private checkState(input: execSsoInput): void {
    if (input.cookie.state !== input.params.state) {
      throw new Error(
        `State do not match: cookie=${input.cookie.state}, request=${input.params.state}`,
      )
    }
  }

  private getSlackJWT(code: string): Promise<Response> {
    return global.fetch(this.SLACK_SSO_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: SLACK_CLIENT_ID,
        client_secret: SLACK_CLIENT_SECRET,
        code,
        redirect_uri: SLACK_SSO_REDIRECT_URL,
      }),
    })
  }

  private async convertTokenResponse(res: Response): Promise<string> {
    const j = await res.json()
    const schema = z.object({
      ok: z.boolean(),
      id_token: z.string().optional(),
      error: z.string().optional(),
    })
    const parsed = schema.parse(j)
    if (!parsed.ok || !parsed.id_token) {
      throw new Error(`Error returned from Slack API: ${parsed.error}`)
    }
    return parsed.id_token
  }

  private async verifyAndDecode(
    idToken: string,
    input: execSsoInput,
  ): Promise<JWTPayload> {
    const jwt = await jwtVerify(
      idToken,
      createRemoteJWKSet(new URL(this.SLACK_JWK_URL)),
      {
        issuer: this.SLACK_JWT_ISSUER,
        audience: SLACK_CLIENT_ID,
      },
    )
    if (input.cookie.nonce !== jwt.payload.nonce) {
      throw new Error(
        `Nonce do not match: cookie=${input.cookie.nonce}, response=${jwt.payload.nonce}`,
      )
    }
    return jwt.payload
  }

  private async getOrCreateUser(payload: JWTPayload): Promise<User> {
    const slackTeamId = payload['https://slack.com/team_id'] as string
    const slackUserId = payload.sub as string
    const email = payload.email as string
    const name = payload.name as string

    const user = await db.user.findFirst({
      where: {
        email,
      },
    })
    if (!user) {
      return db.user.create({
        data: {
          email,
          name,
          slackUserId,
          slackTeamId,
        },
      })
    }
    return user
  }
}
