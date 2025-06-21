import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AdminService } from '../modules/admin-auth/admin.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private adminService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Missing access token');
    }

    try {
      let c=0;
      c=c++;
      console.log('guard token',c, token);
      const { isValid } = await this.adminService.validateToken(token);
      console.log('isvalidghjuygvvb');
      return isValid;
    } catch (error) {
      throw new UnauthorizedException('Invalid token', error);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
