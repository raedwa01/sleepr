import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../database';
import { Role } from './roll.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles?: Role[];
}
