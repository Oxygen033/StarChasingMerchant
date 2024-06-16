import { Module, forwardRef } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { CharactersModule } from 'src/characters/characters.module';
import { CharactersService } from 'src/characters/characters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { EquipmentSlots } from './entities/equipmentSlots.entity';
import { Character } from 'src/characters/entities/character.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory, EquipmentSlots, Character]),
    forwardRef(() => CharactersModule),
  ],
  controllers: [InventoriesController],
  providers: [InventoriesService],
  exports: [InventoriesService],
})
export class InventoriesModule {}
