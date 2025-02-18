import { readFileSync } from 'node:fs'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { BFF_PORT, USE_HTTPS } from './lib/env'

async function bootstrap() {
  const httpsOptions = USE_HTTPS
    ? {
        key: readFileSync(process.env.TLS_KEY_PATH || ''),
        cert: readFileSync(process.env.TLS_CERT_PATH || ''),
      }
    : undefined

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  })
  app.use(cookieParser())

  await app.listen(BFF_PORT)
}
bootstrap()
