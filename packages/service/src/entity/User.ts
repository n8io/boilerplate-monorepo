import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field({ description: `The user's unique id` })
  @PrimaryColumn()
  id: string;

  @Field({ description: `The user's unique username` })
  @Column()
  username: string;

  @Field({ description: `The user's unique email` })
  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column('int', { default: 0 })
  tokenVersion: number;
}
