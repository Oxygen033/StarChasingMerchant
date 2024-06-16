import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Character } from 'src/characters/entities/character.entity';

@Entity()
export class EquipmentSlots {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  head: string;

  @Column({nullable: true})
  clothing_uppedbody: string;

  @Column({nullable: true})
  clothing_legs: string;

  @Column({nullable: true})
  clothing_hands: string;

  @Column({nullable: true})
  clothing_boots: string;

  @Column({nullable: true})
  clothing_eyes: string;

  @Column({nullable: true})
  clothing_amulet: string;

  @Column({nullable: true})
  armor_uppedbody: string;

  @Column({nullable: true})
  armor_legs: string;

  @Column({nullable: true})
  armor_hands: string;

  @Column({nullable: true})
  armor_boots: string;

  @Column({nullable: true})
  weapon: string;
}
