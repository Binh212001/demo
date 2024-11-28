import {
  Bind,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { PostgresDataSource } from 'src/main';
import { Request, Response } from 'express';
import { TodoDto } from './todo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from './FileSizeValidationPipe';

@Controller('/todos')
export class TodoController {
  private readonly todoRepository = PostgresDataSource.getRepository(Todo);

  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(@Req() req: Request): Promise<Todo[]> {
    const result = await this.todoRepository.find();
    console.log(result);
    return result;
  }

  @Post()
  @UseInterceptors(FileInterceptor('imageUrl'))
  @Bind(UploadedFile())
  async cretae(
    @UploadedFile(new FileSizeValidationPipe())
    file: Express.Multer.File,
    @Body() todoDto: TodoDto,
    @Req() req: Request,
  ): Promise<Todo> {
    const imageUrl = new Date() + file.originalname;
    todoDto.imageUrl = imageUrl;

    let todo: Todo = TodoDto.mapToEntity(todoDto);
    const result = await this.todoRepository.save(todo);
    return result;
  }
}
