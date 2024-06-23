import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'reflect-metadata';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CharactersModule } from './characters/characters.module';
import { InventoriesModule } from './inventories/inventories.module';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { JorneysModule } from './journeys/journeys.module';
import { ChatModule } from './chat/chat.module';
import { PrototypesModule } from './prototypes/prototypes.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    }),
    UsersModule,
    CharactersModule,
    InventoriesModule,
    ItemsModule,
    AuthModule,
    JorneysModule,
    ChatModule,
    PrototypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
