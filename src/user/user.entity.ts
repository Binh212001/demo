import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterLoad,
  EventSubscriber,
  Unique,
  AfterInsert,
} from 'typeorm';
import { Role } from './Role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;
}
