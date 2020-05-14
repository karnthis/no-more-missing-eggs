import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import {KitchenModule} from './kitchen/kitchen.module';
import {Kitchen} from './kitchen/entities/kitchen.entity';
import {Membership} from './membership/entities/membership.entity';
import {MembershipModule} from './membership/membership.module';
import {Item} from './item/entities/item.entity';
import {ItemModule} from './item/item.module';
import config from './config';

import * as dotenv from 'dotenv';
import {ConfigModule} from '@nestjs/config';
import {Category} from './category/entities/category.entity';
import {CategoryModule} from './category/category.module';
dotenv.config();

const { PGUSER, PGPASSWORD, PGDB, PGPORT, PGHOST } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: PGHOST,
      port: Number(PGPORT),
      username: PGUSER,
      password: PGPASSWORD,
      database: PGDB,
      entities: [
        Item,
        User,
        Kitchen,
        Category,
        Membership,
      ],
      synchronize: true,
    }),
    AuthModule,
    ItemModule,
    UserModule,
    KitchenModule,
    CategoryModule,
    MembershipModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
