import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CharacterStats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 1 })
    strenght: number;

    @Column({ default: 1 })
    agility: number;

    @Column({ default: 1 })
    intellignce: number;

    @Column({ default: 1 })
    magicPresence: number;
}
