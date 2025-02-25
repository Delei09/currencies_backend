import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { AuthModule } from './modules/auth/auth.module';
import { CurrenciesModule } from './modules/currencies/currencies.module';
import { Users } from './modules/users/users.entity';
import { UsersModule } from './modules/users/users.module';
import { RealTimeGateway } from './realtime/realtime.gateway';
import { RealTimeModule } from './realtime/realtime.module';

dotenv.config();

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST_DB,
      port: parseInt(process.env.PORT_DB),
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.NAME_DB,
      entities: [Users],
      synchronize: true,
      migrationsRun: true,
      migrations: ['database/migrations/*.ts'],
    }),
    UsersModule,
    AuthModule,
    CurrenciesModule,
    RealTimeModule
  ],
  providers: [RealTimeGateway],
})
export class AppModule {}
