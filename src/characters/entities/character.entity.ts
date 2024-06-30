import { Inventory } from 'src/inventories/entities/inventory.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, AfterInsert, OneToOne, JoinColumn } from 'typeorm';
import { EquipmentSlots } from 'src/inventories/entities/equipmentSlots.entity';
import { Race } from '../enums/races.enum';
import { CharacterSpecClass } from '../enums/classes.enum';
import { InventoriesService } from 'src/inventories/inventories.service';
import { Journey } from 'src/journeys/entities/journey.entity';
import { CharacterStats } from './characterStats.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  level: number;

  @Column({ default: 0 })
  exp: number;

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE'] })
  sex: string;

  @Column()
  age: number;

  @Column({ type: 'enum', enum: Race })
  race: Race;

  @Column({ default: 100 })
  hp: number;

  @Column({ default: 100 })
  mana: number;

  @Column({ default: 1000 })
  gold: number;

  @Column({ type: 'enum', enum: CharacterSpecClass })
  class: CharacterSpecClass;

  @OneToMany(() => Inventory, (inventory) => inventory.character)
  inventories: Inventory[];

  @OneToOne(() => EquipmentSlots)
  @JoinColumn()
  equipmentSlots: EquipmentSlots;

  @OneToOne(() => Journey, journey => journey.character)
  journey: Journey;

  @OneToOne(() => CharacterStats)
  @JoinColumn()
  stats: CharacterStats;
}
