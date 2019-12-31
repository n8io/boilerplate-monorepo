import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;
}
