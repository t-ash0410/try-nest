import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { BFF_PORT } from './lib/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  await app.listen(BFF_PORT)
}
bootstrap()
