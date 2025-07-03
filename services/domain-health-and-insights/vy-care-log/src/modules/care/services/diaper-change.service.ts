import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiaperChange } from '../../../entities/diaper_change.entity';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class DiaperChangeService {
  private logger = getLoggerConfig(DiaperChangeService.name);

  constructor(
    @InjectRepository(DiaperChange)
    private readonly diaperRepo: Repository<DiaperChange>,
  ) {
    this.logger.debug(
      `${DiaperChangeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async create(change: Partial<DiaperChange>, traceId: string): Promise<DiaperChange> {
    const entity = this.diaperRepo.create(change);
    await this.diaperRepo.save(entity);
    this.logger.info('DiaperChange created', traceId, 'create', LogStreamLevel.ProdStandard);
    return entity;
  }

  async findAll(babyId: string): Promise<DiaperChange[]> {
    return this.diaperRepo.find({ where: { babyId, isDeleted: false } });
  }
}
