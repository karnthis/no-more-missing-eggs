import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/services/auth.service'
import { UserModule } from './user/user.module';

import { JwtModule } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    AuthModule, 
    UserModule,
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AuthService,
    AppService,
  ],
})
export class AppModule {}
