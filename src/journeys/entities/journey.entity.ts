import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JorneyStatus } from "../enums/jorneyStatus.enum";
import { Character } from "src/characters/entities/character.entity";

@Entity()
export class Journey {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Character, character => character.journey)
    @JoinColumn()
    character: Character;

    @Column()
    startPoint: string;

    @Column()
    endPoint: string;

    @Column()
    startTime: Date;

    @Column({ nullable: true })
    endTime: Date;

    @Column()
    remainingTime: number;

    @Column()
    isPaused: boolean;

    @Column({ type: 'json' })
    events: any[];
}
