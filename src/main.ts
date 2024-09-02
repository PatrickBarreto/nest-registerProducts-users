import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaNotFoundException } from './exception-filters/prisma-not-found.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters( new PrismaNotFoundException());
  app.enableShutdownHooks;
  await app.listen(3000);
}
bootstrap();
