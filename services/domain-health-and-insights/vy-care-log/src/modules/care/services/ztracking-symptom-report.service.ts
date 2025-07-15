import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { SymptomReport } from '../../../entities/symptom_report.entity';
import { ZtrackingSymptomReport } from '../../../entities/ztracking_symptom_report.entity';
import {
  GetZtrackingSymptomReportDto,
  ZtrackingSymptomReportDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingSymptomReportService {
  private logger = getLoggerConfig(ZtrackingSymptomReportService.name);

  constructor(
    @InjectRepository(ZtrackingSymptomReport)
    private readonly zRepo: Repository<ZtrackingSymptomReport>,
  ) {
    this.logger.debug(
      `${ZtrackingSymptomReportService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForSymptomReport(
    symptom: SymptomReport,
    traceId: string,
  ): Promise<ZtrackingSymptomReport> {
    const entity = await this.zRepo.save(
      this.zRepo.create({ ...symptom, versionDate: new Date() }),
    );

    this.logger.info(
      `ztracking symptom report saved in database`,
      traceId,
      'createZtrackingForSymptomReport',
      LogStreamLevel.ProdStandard,
    );
    return entity;
  }

  async getZtrackingForSymptomReport(
    getZtrackingSymptomReportDto: GetZtrackingSymptomReportDto,
    traceId: string,
  ): Promise<ZtrackingSymptomReportDto[]> {
    const { symptomId = '' } = getZtrackingSymptomReportDto;
    const list = await this.zRepo.find({ where: { symptomId } });

    if (!list.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${symptomId}`,
        traceId,
        'getZtrackingForSymptomReport',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${symptomId}`,
      );
    }

    this.logger.info(
      `${list.length} ztracking symptom report found in database`,
      traceId,
      'getZtrackingForSymptomReport',
      LogStreamLevel.ProdStandard,
    );

    return list;
  }
}
