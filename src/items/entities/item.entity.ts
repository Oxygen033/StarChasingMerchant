import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ItemType } from "../enums/ItemType";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: 'enum', enum: ItemType})
    type: string;

    @Column()
    cost: number;
}
