import { Module } from '@nestjs/common';
import { PrototypesService } from './prototypes.service';
import { PrototypeFactoryService } from './prototypesFactory.service';

@Module({
  providers: [PrototypesService, PrototypeFactoryService],
  exports: [PrototypesService, PrototypeFactoryService]
})
export class PrototypesModule { }
