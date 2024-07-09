import { Module, forwardRef } from '@nestjs/common';
import { JourneysService } from './journeys.service';
import { JourneysGateway } from './journeys.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journey } from './entities/journey.entity';
import { ChatModule } from 'src/chat/chat.module';
import { Character } from 'src/characters/entities/character.entity';
import { PrototypesModule } from 'src/prototypes/prototypes.module';
import { JourneysEventsService } from './journeysEvents.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Journey, Character]),
    ChatModule,
    forwardRef(() => PrototypesModule),
  ],
  providers: [JourneysGateway, JourneysService, JourneysEventsService],
  exports: [JourneysService]
})
export class JorneysModule { }
