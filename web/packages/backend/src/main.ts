import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { BFF_PORT } from './lib/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(BFF_PORT)
}
bootstrap()
