import { Character } from 'src/characters/entities/character.entity';
import { InventoryItem } from 'src/items/entities/inventoryItem.entity';
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Character, (character) => character.inventories)
  character: Character;

  @Column()
  capacity: number;

  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.inventory)
  items: InventoryItem[];
}
