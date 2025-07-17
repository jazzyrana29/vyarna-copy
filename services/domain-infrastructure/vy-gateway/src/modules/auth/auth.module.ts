import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { PersonSessionModule } from '../domain-person-and-identity/vy-session/vy-session.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    PersonSessionModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
