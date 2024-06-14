import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { InitiateResetPasswordDTO } from './dto/initiate-reset-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDTO, @Res() res: Response) {
    console.log(dto);
    const result = await this.authService.login(dto);
    return res.status(result.status).json(result.response);
  }
  @Get('currentUser/:token')
  @UseGuards(AuthGuard)
  async getCurrentUser(@Param('token') token: string, @Req() req: Request) {
    const user = await this.userService.getUserById(req['user'].id);
    if (!user) {
      return { data: null, message: 'No user found!', success: false };
    }
    return { data: user, message: 'User found', success: true };
  }
  // @Post('AdminLogin')
  // async adminLogin(@Body() dto: LoginDTO, @Res() res: Response) {
  //   console.log(dto);
  //   const result = await this.authService.adminAuth(dto);
  //   return res.status(result.status).json(result.response);
  // }

  @Post('initiate-reset-password')
  async initiateResetPassword(
    @Body() dto: InitiateResetPasswordDTO,
    @Res() res: Response,
  ) {
    const data = await this.authService.initiateResetPassword(dto.email);
    return res.status(200).json({ message: 'success', data });
  }

  @Put('reset-password/:token')
  async resetPassword(
    @Body() dto: ResetPasswordDTO,
    @Param('token') token: string,
  ) {
    try {
      await this.authService.resetPassword(token, dto.newPassword);
    } catch (error) {
      console.log('Error resetting password:', error);
      return { message: error.message };
    }
  }

  // @Post('initiate-email-verification')
  // async initiateEmailVerification(@Body('email') email: string) {
  //   try {
  //     await this.authService.initiateEmailVerification(email);
  //     return { message: 'Email verification initiated successfully' };
  //   } catch (error) {
  //     console.log('Error initiating email verification:', error);
  //     return { message: 'Failed to initiate email verification', error };
  //   }
  // }
  // @Put('verify-email/:token')
  // async verifyEmail(@Param('token') token: string) {
  //   try {
  //     const userId = await this.authService.verifyEmail(token);

  //     if (userId) {
  //       return { message: 'Email verification successful' };
  //     } else {
  //       return { message: 'Email verification failed' };
  //     }
  //   } catch (error) {
  //     console.error('Error verifying email:', error);
  //     return { message: 'An error occurred during email verification' };
  //   }
  // }
}
