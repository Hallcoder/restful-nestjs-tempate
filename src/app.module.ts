import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'prisma/prisma.module';
import { BooksModule } from './books/books.module';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [AuthModule,UserModule,PrismaModule, BooksModule, LoggingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
