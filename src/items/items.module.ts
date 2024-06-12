import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemPrototypeService } from './itemsPrototype.service';
import { ItemFactoryService } from './itemsFactory.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [ItemsController],
  providers: [ItemsService, ItemPrototypeService, ItemFactoryService],
})
export class ItemsModule {}
