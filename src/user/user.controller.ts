import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PostgresDataSource } from 'src/main';
import { User } from './user.entity';
import { UserForm, UserFormInterface } from './user.form';
import * as session from 'express-session';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('/user')
export class USerController {
  private readonly repo = PostgresDataSource.getRepository(User);
  constructor() {}

  @Post('/create')
  async create(@Body() form: UserForm): Promise<User> {
    let user = UserForm.mapToEntity(form);
    const result = await this.repo.save(user);
    return result;
  }

  @Post('/login')
  async login(@Body() form: UserForm): Promise<any> {
    const { username, password } = form;

    const user = await this.repo.findOneBy({
      username,
      password,
    });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
