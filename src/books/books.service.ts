import { Injectable } from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BooksService {
    constructor(private readonly prisma: PrismaService){}

 async createBook(book: CreateBookDTO){
  console.log("Step 2..")
  const bookData = await this.prisma.book.create({
    data:{
        ...book
    }
  });
  console.log(bookData);
  return bookData;
 }

 async getBooks(){
    const bookData = await this.prisma.book.findMany();
    return bookData;
   }
}
