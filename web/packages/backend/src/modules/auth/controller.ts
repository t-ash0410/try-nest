import { DOMAIN } from '@backend/lib/env'
import { Controller, Get, Res } from '@nestjs/common'
import type { CookieOptions, Response } from 'express'
import { AuthService } from './service'

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('/session')
  session(@Res({ passthrough: true }) res: Response) {
    const session = this.service.getSession()
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
}
