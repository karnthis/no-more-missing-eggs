import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
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
import {Category} from './category/entities/category.entity';
import {CategoryModule} from './category/category.module';
import {Carton} from './carton/entities/carton.entity';

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
      entities: [
        Item,
        User,
        Carton,
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
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
