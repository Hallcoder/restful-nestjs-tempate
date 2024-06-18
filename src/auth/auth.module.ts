import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import config from 'src/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config().jwt.secret,
      signOptions: { expiresIn: config().jwt.expiresIn },
    })
  ],
  providers: [AuthService, UserService,AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
