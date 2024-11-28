import { User } from './user.entity';

export interface UserFormInterface {
  id: number;
  username: string;
  password: string;
}

export class UserForm implements UserFormInterface {
  id: number;
  username: string;
  password: string;

  /**
   * Maps the current DTO to a Todo entity.
   * @returns {Todo} A new Todo entity with the mapped values.
   */
  static mapToEntity(form: UserForm): User {
    const user = new User();
    user.username = form.username;
    user.password = form.password;
    return user;
  }
}
