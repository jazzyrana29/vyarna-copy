import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(
    req: Request,
    email: string,
    password: string,
  ): Promise<any> {
    const { ipAddress, location } = req.body;
    const session = await this.authService.validateUser({
      email,
      password,
      ipAddress,
      location,
    } as any);
    if (!session) {
      throw new UnauthorizedException();
    }
    return session;
  }
}
