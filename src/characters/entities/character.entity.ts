import { Inventory } from 'src/inventories/entities/inventory.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EquipmentSlot } from './equipmentSlot.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  level: number;

  @Column()
  exp: number;

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE'] })
  sex: string;

  @Column()
  age: number;

  @OneToMany(() => Inventory, (inventory) => inventory.character)
  inventories: Inventory[];

  @OneToMany(() => EquipmentSlot, (equipmentSlot) => equipmentSlot.character)
  equipmentSlots: EquipmentSlot[];
}
