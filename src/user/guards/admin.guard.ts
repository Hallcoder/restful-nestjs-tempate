import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';

export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('[APPLICATION LOG]: Checking admin...');
    const token = request.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
      const tokenValue = token.split(' ')[1];
      try {
        const decodedToken = this.jwtService.verify(tokenValue);
        const user = await this.userService.getUserById(decodedToken.id);
        console.log('[APPLICATION LOG]: Admin check successful.');
        console.log('[APPLICATION LOG]: User: ', decodedToken);
        request.user = decodedToken;
        return true;
      } catch (error) {
        return false;
      }
    }
  }
}
