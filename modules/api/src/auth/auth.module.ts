
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service';


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
    // JwtService,
    LocalStrategy,
    UserService
  ],
  exports: [AuthService]
})
export class AuthModule {}