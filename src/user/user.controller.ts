import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import ApiResponse from 'src/utils/ApiResponse';
import { RegisterDTO } from './dto/create-user.dto';
import { AdminGuard } from './guards/admin.guard';
import { UserService } from './user.service';
import { log } from 'console';
import { request } from 'express';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() dto: RegisterDTO) {
    const response = await this.userService.createUser(dto);
    return response;
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async update() {}
  
  @Get('all')
  async all() {
    const users = await this.userService.getAllUsers();
    return ApiResponse.success('Users retrieved successfully', users);
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    const user = await this.userService.getUserById(id);

    return ApiResponse.success('User retrieved successfully', user);
  }
  // @Get('search/:query')
  // async search(@Param('query') query: string) {
  //   const results = await this.userService.searchUsers(query);
  //   return ApiResponse.success(
  //     'Search results retrieved successfully',
  //     results,
  //   );
  // }
 
}
