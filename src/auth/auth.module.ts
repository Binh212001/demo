import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './LocalStrategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { SessionSerializer } from './SessionSerializer';
import { UsersService } from 'src/user/UsersService';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, SessionSerializer, UsersService],
})
export class AuthModule {}
