import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const http = context.switchToHttp();

    const request = http.getRequest<
      Request & {
        session: {
          admin?: { isLoggedIn: boolean; user: string };
        };
      }
    >();

    const session = request.session;

    if (session && session.admin?.isLoggedIn) {
      return true;
    }

    throw new UnauthorizedException('관리자 권한이 필요합니다.');
  }
}
