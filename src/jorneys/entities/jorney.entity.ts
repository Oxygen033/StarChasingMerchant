import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { JorneyStatus } from "../enums/jorneyStatus.enum";

@Entity()
export class Jorney {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'enum', enum: JorneyStatus})
    status: JorneyStatus;

    @Column()
    startPoint: string;

    @Column()
    endPoint: string;

    @Column()
    startTime: Date;

    @Column({nullable: true})
    pauseTime: Date;

    @Column()
    duration: number;
}
