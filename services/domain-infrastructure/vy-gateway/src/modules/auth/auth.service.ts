import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginSessionDto, generateTraceId } from 'ez-utils';
import { PersonSessionKafkaService } from '../domain-person-and-identity/vy-session/microservices/vy-session-kafka.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly sessionKafka: PersonSessionKafkaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(dto: LoginSessionDto) {
    const traceId = generateTraceId('authLogin');
    const session = await this.sessionKafka.loginSession(dto, traceId);
    return session;
  }

  async login(session: any) {
    const payload = { sub: session.sessionId };
    return { access_token: this.jwtService.sign(payload) };
  }
}
