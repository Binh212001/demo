import { Module } from '@nestjs/common';
import { USerController } from './user.controller';

@Module({
  imports: [],
  controllers: [USerController],
  providers: [],
})
export class UserModule {}
