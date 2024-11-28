import { Injectable } from '@nestjs/common';
import { PostgresDataSource } from 'src/main';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly repo = PostgresDataSource.getRepository(User);

  async findByUsername(username: string, password: string) {
    const user = await this.repo.findOneBy({
      username,
      password,
    });
    return user;
  }
}
