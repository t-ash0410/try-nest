import { DOMAIN, JWT_KEY, JWT_SECRET } from '@backend/lib/env'
import { Controller, Get, Query, Req, Res } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { CookieOptions, Request, Response } from 'express'
import { AuthService } from './auth.service'

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/oidc/session')
  oidcSession(@Res({ passthrough: true }) res: Response) {
    const session = this.authService.getSession()
    const opts: CookieOptions = {
      signed: false,
      expires: session.expires,
      path: '/',
      secure: true,
      domain: DOMAIN,
      httpOnly: true,
      sameSite: 'strict',
    }
    res.cookie('state', session.state, opts)
    res.cookie('nonce', session.nonce, opts)
    return session
  }

  @Get('/oidc/slack')
  async oidcSlack(
    @Req() req: Request,
    @Query('code') code: string,
    @Query('state') state: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.clearSessionCookie(res)

    const execSsoRes = await this.authService.execSso({
      params: {
        state,
        code,
      },
      cookie: {
        state: req.cookies.state,
        nonce: req.cookies.nonce,
      },
    })

    const now = new Date()
    const token = await this.generateAccessToken(now, execSsoRes.user.userId)
    this.setJwtToCookie(res, token, now)

    return {
      token,
      slackTeamId: execSsoRes.user.slackTeamId,
    }
  }

  private clearSessionCookie(res: Response) {
    const opts: CookieOptions = {
      path: '/',
      secure: true,
      domain: DOMAIN,
      httpOnly: true,
      sameSite: 'strict',
    }
    res.clearCookie('state', opts)
    res.clearCookie('nonce', opts)
  }

  private generateAccessToken(now: Date, userId: number): Promise<string> {
    const iat = Math.floor(now.getTime() / 1000)
    const exp = iat + 3 * 60 * 60 // 3 hours
    return this.jwtService.signAsync(
      {
        sub: userId,
        iat,
        exp,
        iss: DOMAIN,
      },
      {
        secret: JWT_SECRET,
      },
    )
  }

  private setJwtToCookie(res: Response, token: string, now: Date): void {
    const expires = new Date()
    expires.setHours(now.getHours() + 3) // 3 hours
    res.cookie(JWT_KEY, token, {
      signed: false,
      expires,
      path: '/',
      secure: true,
      domain: DOMAIN,
      httpOnly: true,
      sameSite: 'strict',
    })
  }
}
