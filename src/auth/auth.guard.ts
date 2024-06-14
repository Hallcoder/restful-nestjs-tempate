import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('[APPLICATION LOG]: Checking authentication...');
    const token = request.headers["authorization"];
    if (token && token.startsWith('Bearer ')) {
      console.log("Good")
      const tokenValue = token.split(' ')[1];
      try {
        const decodedToken = this.jwtService.verify(tokenValue);
        console.log('[APPLICATION LOG]: Authentication successful.');
        console.log('[APPLICATION LOG]: User: ', decodedToken);
        request.user = decodedToken;
        return true;
      } catch (error) {
        console.log(error.message)
        return false;
      }
    }
  }
}
