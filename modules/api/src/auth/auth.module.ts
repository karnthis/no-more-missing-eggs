
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
    PassportModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserService
  ],
  exports: [AuthService]
})
export class AuthModule {}