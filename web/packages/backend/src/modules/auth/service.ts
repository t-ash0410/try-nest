import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  getSession(): { state: string; nonce: string; expires: Date } {
    const expires = new Date()
    expires.setMinutes(expires.getMinutes() + 10)

    return {
      state: crypto.randomUUID(),
      nonce: crypto.randomUUID(),
      expires,
    }
  }
}
