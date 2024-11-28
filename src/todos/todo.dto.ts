import { Status, Todo } from './todo.entity';

export interface TodoInterface {
  id: number;
  name: string;
  description: string;
  status: Status;
  imageUrl: string;
}

export class TodoDto implements TodoInterface {
  id: number;
  name: string;
  description: string;
  status: Status;
  imageUrl: string;

  /**
   * Maps the current DTO to a Todo entity.
   * @returns {Todo} A new Todo entity with the mapped values.
   */
  static mapToEntity(dto: TodoDto): Todo {
    const todo = new Todo();
    todo.name = dto.name;
    todo.description = dto.description;
    todo.status = dto.status;
    todo.imageUrl = dto.imageUrl;
    return todo;
  }
}
