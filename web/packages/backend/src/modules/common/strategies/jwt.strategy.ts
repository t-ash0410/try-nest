import { JWT_KEY, JWT_SECRET } from '@backend/lib/env'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req?.cookies?.[JWT_KEY] ?? ''
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    })
  }

  async validate(payload: { sub: number }) {
    return {
      userId: payload.sub,
    }
  }
}
