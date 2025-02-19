import { readFileSync } from 'node:fs'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { BFF_PORT, CORS_ORIGIN, USE_HTTPS } from './lib/env'

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
  app.enableCors({
    origin: CORS_ORIGIN,
    credentials: true,
    // allowHeaders: 'Access-Control-Allow-Credentials',
  })
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(BFF_PORT)
}
bootstrap()
