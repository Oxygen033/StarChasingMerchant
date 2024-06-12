import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/roles/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  @Exclude({ toPlainOnly: true })
  roles: Role[];
}
