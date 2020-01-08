import { Authorized, Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';
import { UserRole } from 'types/userRole';

const { DB_SCHEMA: schema } = process.env;

@ObjectType()
@Entity('users', { schema })
export class User extends BaseEntity {
  @Field({ description: `The user's unique id` })
  @PrimaryColumn()
  id: string;

  @Column()
  @Field({ description: `The user's unique username` })
  @Index({ unique: true })
  username: string;

  @Authorized([UserRole.ADMIN])
  @Column()
  @Field({ description: `The user's unique email` })
  @Index({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column('int', { default: 0 })
  tokenVersion: number;

  @Authorized([UserRole.ADMIN])
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @Field({ description: `The user's authorization level` })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;

  @Column({ nullable: true })
  deletedBy: string;
}
