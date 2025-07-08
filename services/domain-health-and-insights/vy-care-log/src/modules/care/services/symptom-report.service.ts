import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SymptomReport } from '../../../entities/symptom_report.entity';
import { ZtrackingSymptomReportService } from './ztracking-symptom-report.service';
import {
  CreateSymptomReportDto,
  GetSymptomReportsDto,
  SymptomReportDto,
  ValidateCareEventTimeDto,
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

  private async validateEventTime(
    validateCareEventTimeDto: ValidateCareEventTimeDto,
  ): Promise<void> {
    const { babyId, eventTime } = validateCareEventTimeDto;
    const latest = await this.symptomRepo.findOne({
      where: { babyId, isDeleted: false },
      order: { eventTime: 'DESC' },
    });

    if (
      latest &&
      latest.eventTime.getTime() - new Date(eventTime).getTime() >
        60 * 60 * 1000
    ) {
      throw new BadRequestException(
        'Event time cannot be more than one hour older than the latest symptom report',
      );
    }
  }

  async createSymptomReport(
    createSymptomReportDto: CreateSymptomReportDto,
    traceId: string,
  ): Promise<SymptomReportDto> {
    await this.validateEventTime(createSymptomReportDto);
    const entity = this.symptomRepo.create(createSymptomReportDto);
    await this.symptomRepo.save(entity);
    this.logger.info(
      'SymptomReport created',
      traceId,
      'createSymptomReport',
      LogStreamLevel.ProdStandard,
    );
    await this.ztrackingService.createZtrackingForSymptomReport(
      entity,
      traceId,
    );
    return entity;
  }

  async getSymptomReports(
    getSymptomReportsDto: GetSymptomReportsDto,
    traceId: string,
  ): Promise<SymptomReportDto[]> {
    const { babyId } = getSymptomReportsDto;
    const list = await this.symptomRepo.find({
      where: { babyId, isDeleted: false },
    });
    this.logger.info(
      `${list.length} SymptomReport(s) retrieved`,
      traceId,
      'getSymptomReports',
      LogStreamLevel.ProdStandard,
    );
    return list;
  }
}
