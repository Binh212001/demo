import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterLoad,
  EventSubscriber,
  Unique,
} from 'typeorm';

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
