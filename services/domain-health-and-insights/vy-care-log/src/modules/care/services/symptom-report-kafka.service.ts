import { Injectable } from '@nestjs/common';
import { SymptomReportService } from './symptom-report.service';
import { ZtrackingSymptomReportService } from './ztracking-symptom-report.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_SYMPTOM_REPORT,
  KT_GET_SYMPTOM_REPORTS,
  KT_GET_ZTRACKING_SYMPTOM_REPORT,
  CreateSymptomReportDto,
  GetSymptomReportsDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SymptomReportKafkaService {
  public serviceName = SymptomReportKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly symptomService: SymptomReportService,
    private readonly ztrackingService: ZtrackingSymptomReportService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${SymptomReportKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createSymptomReport(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_SYMPTOM_REPORT,
      message,
      key,
      async (value: CreateSymptomReportDto, traceId: string) =>
        await this.symptomService.createSymptomReport(value, traceId),
    );
  }

  async getSymptomReports(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_SYMPTOM_REPORTS,
      message,
      key,
      async (value: GetSymptomReportsDto, traceId: string) =>
        await this.symptomService.getSymptomReports(value, traceId),
    );
  }

  async getZtrackingSymptomReport(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_SYMPTOM_REPORT,
      message,
      key,
      async (value: { symptomId?: string }, traceId: string) =>
        await this.ztrackingService.getZtrackingForSymptomReport(value, traceId),
    );
  }
}
