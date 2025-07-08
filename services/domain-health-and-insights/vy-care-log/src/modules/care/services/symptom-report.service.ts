import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SymptomReport } from '../../../entities/symptom_report.entity';
import { ZtrackingSymptomReportService } from './ztracking-symptom-report.service';
import {
  CreateSymptomReportDto,
  GetSymptomReportsDto,
  SymptomReportDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SymptomReportService {
  private logger = getLoggerConfig(SymptomReportService.name);

  constructor(
    @InjectRepository(SymptomReport)
    private readonly symptomRepo: Repository<SymptomReport>,
    private readonly ztrackingService: ZtrackingSymptomReportService,
  ) {
    this.logger.debug(
      `${SymptomReportService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createSymptomReport(
    createSymptomReportDto: CreateSymptomReportDto,
    traceId: string,
  ): Promise<SymptomReportDto> {
    const entity = this.symptomRepo.create(createSymptomReportDto);
    await this.symptomRepo.save(entity);
    this.logger.info(
      'SymptomReport created',
      traceId,
      'createSymptomReport',
      LogStreamLevel.ProdStandard,
    );
    await this.ztrackingService.createZtrackingForSymptomReport(entity, traceId);
    return entity;
  }

  async getSymptomReports(
    getSymptomReportsDto: GetSymptomReportsDto,
    traceId: string,
  ): Promise<SymptomReportDto[]> {
    const { babyId } = getSymptomReportsDto;
    const list = await this.symptomRepo.find({ where: { babyId, isDeleted: false } });
    this.logger.info(
      `${list.length} SymptomReport(s) retrieved`,
      traceId,
      'getSymptomReports',
      LogStreamLevel.ProdStandard,
    );
    return list;
  }
}
