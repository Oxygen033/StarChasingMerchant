import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./character.entity";
import { EquipmentSlotType } from "../enums/equipmentSlotType";
import { Item } from "src/items/entities/item.entity";

@Entity()
export class EquipmentSlot {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Character, (character) => character.equipmentSlots)
    character: Character;

    @Column({type: 'enum', enum: EquipmentSlotType})
    slotType: string;

    @ManyToOne(() => Item, {nullable: true})
    item: Item;
}