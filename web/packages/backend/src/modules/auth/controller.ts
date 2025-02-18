import { DOMAIN } from '@backend/lib/env'
import { Controller, Get, Res } from '@nestjs/common'
import type { Response } from 'express'
import { AuthService } from './service'

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('/session')
  session(@Res({ passthrough: true }) res: Response) {
    const session = this.service.getSession()
    res.cookie('state', session.state, {
      signed: false,
      expires: session.expires,
      path: '/',
      secure: true,
      domain: DOMAIN,
      httpOnly: true,
      sameSite: 'strict',
    })
    res.cookie('nonce', session.nonce, {
      signed: false,
      expires: session.expires,
      path: '/',
      secure: true,
      domain: DOMAIN,
      httpOnly: true,
      sameSite: 'strict',
    })
    return session
  }
}
