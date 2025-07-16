import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../../../entities/session.entity';
import {
  CreateSessionDto,
  UpdateSessionDto,
  GetOneSessionDto,
  DeleteSessionDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SessionService {
  private logger = getLoggerConfig(SessionService.name);

  constructor(@InjectRepository(Session) private readonly sessionRepo: Repository<Session>) {
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
}
