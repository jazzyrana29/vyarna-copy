import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../../../entities/session.entity';
import { Person } from '../../../entities/person.entity';
import { Email } from '../../../entities/email.entity';
import {
  CreateSessionDto,
  UpdateSessionDto,
  GetOneSessionDto,
  DeleteSessionDto,
  LoginSessionDto,
  LoginSessionResponseDto,
  PersonWithoutPasswordDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SessionService {
  private logger = getLoggerConfig(SessionService.name);

  constructor(
    @InjectRepository(Session) private readonly sessionRepo: Repository<Session>,
    @InjectRepository(Person) private readonly personRepo: Repository<Person>,
    @InjectRepository(Email) private readonly emailRepo: Repository<Email>,
  ) {
    this.logger.debug(`${SessionService.name} initialized`, '', 'constructor', LogStreamLevel.DebugLight);
  }

  async createSession(dto: CreateSessionDto, traceId: string): Promise<Session> {
    const entity = this.sessionRepo.create(dto);
    await this.sessionRepo.save(entity);
    this.logger.info('Session created', traceId, 'createSession', LogStreamLevel.ProdStandard);
    return entity;
  }

  async updateSession(dto: UpdateSessionDto, traceId: string): Promise<Session> {
    const entity = await this.sessionRepo.findOne({ where: { sessionId: dto.sessionId } });
    if (!entity) throw new NotFoundException(`session ${dto.sessionId} not found`);
    await this.sessionRepo.update(dto.sessionId, dto);
    const updated = await this.sessionRepo.findOne({ where: { sessionId: dto.sessionId } });
    this.logger.info('Session updated', traceId, 'updateSession', LogStreamLevel.ProdStandard);
    return updated!;
  }

  async getSession(dto: GetOneSessionDto, traceId: string): Promise<Session> {
    const entity = await this.sessionRepo.findOne({ where: { sessionId: dto.sessionId } });
    if (!entity) throw new NotFoundException(`session ${dto.sessionId} not found`);
    this.logger.info('Session retrieved', traceId, 'getSession', LogStreamLevel.ProdStandard);
    return entity;
  }

  async deleteSession(dto: DeleteSessionDto, traceId: string): Promise<void> {
    const entity = await this.sessionRepo.findOne({ where: { sessionId: dto.sessionId } });
    if (!entity) throw new NotFoundException(`session ${dto.sessionId} not found`);
    await this.sessionRepo.delete(dto.sessionId);
    this.logger.info('Session deleted', traceId, 'deleteSession', LogStreamLevel.ProdStandard);
  }

  async loginSession(
    dto: LoginSessionDto,
    traceId: string,
  ): Promise<LoginSessionResponseDto> {
    const emailEntity = await this.emailRepo.findOne({ where: { email: dto.email } });
    if (!emailEntity) throw new UnauthorizedException('Invalid credentials');

    const person = await this.personRepo.findOne({
      where: { personId: emailEntity.personId },
      relations: { emails: true, addresses: true },
    });
    if (!person || person.password !== dto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const session = this.sessionRepo.create({
      personId: person.personId,
      ipAddress: dto.ipAddress,
      location: dto.location,
    });
    await this.sessionRepo.save(session);
    this.logger.info('Person logged in', traceId, 'loginSession', LogStreamLevel.ProdStandard);

    const { password, ...rest } = person;

    return {
      session,
      person: rest as PersonWithoutPasswordDto,
    };
  }
}
