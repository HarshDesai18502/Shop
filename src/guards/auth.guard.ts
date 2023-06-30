import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token');
    }

    const extractedToken = token.split(' ')[1];

    try {
      const decodedToken = this.jwtService.verify(extractedToken);
      request.user = decodedToken;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
