import { Module, forwardRef } from '@nestjs/common';
import { PrototypesService } from './prototypes.service';
import { PrototypeFactoryService } from './prototypesFactory.service';
import { PrototypesDIContainer } from './prototypesDIContainer.service';
import { ItemsModule } from 'src/items/items.module';
import { ChatModule } from 'src/chat/chat.module';
import { JorneysModule } from 'src/journeys/journeys.module';

@Module({
  imports: [forwardRef(() => ItemsModule), ChatModule, forwardRef(() => JorneysModule)],
  providers: [PrototypesService, PrototypeFactoryService, PrototypesDIContainer],
  exports: [PrototypesService, PrototypeFactoryService, PrototypesDIContainer]
})
export class PrototypesModule { }
