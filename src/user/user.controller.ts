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
import { LocalAuthGuard } from 'src/auth/LocalAuthGuard';
import { AuthenticatedGuard } from 'src/auth/AuthenticatedGuard';
import * as bcrypt from 'bcrypt';
@Controller('/user')
export class USerController {
  private readonly repo = PostgresDataSource.getRepository(User);
  constructor() {}

  @Post('/create')
  async create(@Body() form: UserForm): Promise<User> {
    let user = UserForm.mapToEntity(form);
    const passwordHash = await bcrypt.hashSync(form.password, 10);
    user.password = passwordHash;
    const result = await this.repo.save(user);
    return result;
  }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request): Promise<any> {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/test')
  async test(@Req() req: Request): Promise<any> {
    return 'req.user';
  }
}
