import { Module } from '@nestjs/common'
import { SessionResolver } from './session.resolver'

@Module({
  providers: [SessionResolver],
})
export class SessionModule {}
