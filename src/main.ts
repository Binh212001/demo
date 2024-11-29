import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';
import { Todo } from './todos/todo.entity';
import { User } from './user/user.entity';
import * as passport from 'passport';
export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'binh2',
  password: '212002',
  database: 'demo',
  entities: [Todo, User],
  synchronize: true,
  // maxQueryExecutionTime: 1000,performance issues
});

async function bootstrap() {
  try {
    await PostgresDataSource.initialize();
    const app = await NestFactory.create(AppModule);
    app.use(
      session({
        secret: 'your-secret-key', // Replace with a secure secret key
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 3600000 }, // 1 hour
      }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(process.env.PORT ?? 3000);
  } catch (err) {
    console.log('🚀 ~ bootstrap ~ err:', err);
  }
}
bootstrap();
