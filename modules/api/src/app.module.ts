import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

import * as dotenv from 'dotenv';
dotenv.config();

const { PGUSER, PGPASSWORD, PGDB, PGPORT, PGHOST } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: PGHOST,
      port: Number(PGPORT),
      username: PGUSER,
      password: PGPASSWORD,
      database: PGDB,
      entities: [User],
      synchronize: true,
    }),
    AuthModule, 
    UserModule,

  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
