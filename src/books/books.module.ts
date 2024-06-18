import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';


@Module({
  exports: [
    BooksService
  ],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
