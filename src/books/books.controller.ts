import { Controller, Get, UseGuards } from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { Body, Post,Response,Request } from '@nestjs/common';
import ApiResponse from 'src/utils/ApiResponse';
import { BooksService } from './books.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('books')
@ApiTags("Books")
export class BooksController {
constructor(private bookService: BooksService){}

@Post("/create")
async  createBook(@Body() book: CreateBookDTO ){
    console.log("Creating book...")
  try {
    const newBook = await this.bookService.createBook(book);
    return ApiResponse.success("Book Created Successfully!",newBook,201);
  } catch (error) {
    return ApiResponse.error(error.message);
  }
}

@Get()
@UseGuards(AuthGuard)
async  getBooks(){
  try {
    const books = await this.bookService.getBooks();
    return ApiResponse.success("Success",books,200);
  } catch (error) {
    return ApiResponse.error(error.message);
  }
}

}
