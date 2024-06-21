import { Module } from '@nestjs/common';
import { PrototypesService } from './prototypes.service';

@Module({
  providers: [PrototypesService],
  exports: [PrototypesService]
})
export class PrototypesModule {}
