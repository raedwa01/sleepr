import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../database';
import { Field, InputType, ObjectType, ResolveField } from '@nestjs/graphql';

@Entity()
@ObjectType()
@InputType('Role')
export class Role extends AbstractEntity<Role> {
  @Column()
  @Field()
  name: string;
}
