import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

interface CustomRequest extends Request {
  user?: any;
}

@Injectable()
export class CurrentUserMiddleWare implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const token: string = req.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token');
    }

    const extractedToken = token.split(' ')[1];
    try {
      const decodedToken = this.jwtService.verify(extractedToken);

      console.log('middleware');

      const { userId, admin } = decodedToken;
      req.user = {
        userId,
        admin,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    next();
  }
}
