import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import config from 'src/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { MailModule } from 'src/mail/mail.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config().jwt.secret,
      signOptions: { expiresIn: config().jwt.expiresIn },
    }),
    MailModule
  ],
  providers: [AuthService, UserService,AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
