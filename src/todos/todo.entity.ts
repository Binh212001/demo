import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterLoad,
  EventSubscriber,
} from 'typeorm';
import { TodoInterface } from './todo.dto';

export enum Status {
  Pending = 'pending',
  Completed = 'completed',
  Todo = 'todo',
}

@EventSubscriber()
@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.Todo,
  })
  status: Status;

  @AfterLoad()
  updateCounters() {
    this.status = Status.Todo;
  }
}
