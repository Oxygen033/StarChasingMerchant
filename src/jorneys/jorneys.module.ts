import { Module } from '@nestjs/common';
import { JorneysService } from './jorneys.service';
import { JorneysGateway } from './jorneys.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jorney } from './entities/jorney.entity';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Jorney]),
    ChatModule
  ],
  providers: [JorneysGateway, JorneysService],
})
export class JorneysModule {}
