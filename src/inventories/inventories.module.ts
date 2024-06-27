import { Module, forwardRef } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { CharactersModule } from 'src/characters/characters.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { EquipmentSlots } from './entities/equipmentSlots.entity';
import { Character } from 'src/characters/entities/character.entity';
import { InventoryItem } from 'src/items/entities/inventoryItem.entity';
import { PrototypesModule } from 'src/prototypes/prototypes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory, EquipmentSlots, Character, InventoryItem]),
    forwardRef(() => CharactersModule),
    PrototypesModule
  ],
  controllers: [InventoriesController],
  providers: [InventoriesService],
  exports: [InventoriesService],
})
export class InventoriesModule { }
