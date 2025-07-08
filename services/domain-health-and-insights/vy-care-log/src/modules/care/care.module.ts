import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaperChange } from '../../entities/diaper_change.entity';
import { ZtrackingDiaperChange } from '../../entities/ztracking_diaper_change.entity';
import { MedicationAdministration } from '../../entities/medication_administration.entity';
import { ZtrackingMedicationAdministration } from '../../entities/ztracking_medication_administration.entity';
import { TemperatureMeasurement } from '../../entities/temperature_measurement.entity';
import { ZtrackingTemperatureMeasurement } from '../../entities/ztracking_temperature_measurement.entity';
import { SymptomReport } from '../../entities/symptom_report.entity';
import { ZtrackingSymptomReport } from '../../entities/ztracking_symptom_report.entity';
import { DiaperChangeService } from './services/diaper-change.service';
import { DiaperChangeKafkaService } from './services/diaper-change-kafka.service';
import { ZtrackingDiaperChangeService } from './services/ztracking-diaper-change.service';
import { MedicationAdministrationService } from './services/medication-administration.service';
import { MedicationAdministrationKafkaService } from './services/medication-administration-kafka.service';
import { ZtrackingMedicationAdministrationService } from './services/ztracking-medication-administration.service';
import { TemperatureMeasurementService } from './services/temperature-measurement.service';
import { TemperatureMeasurementKafkaService } from './services/temperature-measurement-kafka.service';
import { ZtrackingTemperatureMeasurementService } from './services/ztracking-temperature-measurement.service';
import { SymptomReportService } from './services/symptom-report.service';
import { SymptomReportKafkaService } from './services/symptom-report-kafka.service';
import { ZtrackingSymptomReportService } from './services/ztracking-symptom-report.service';
import { DiaperChangeController } from './care.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DiaperChange,
      ZtrackingDiaperChange,
      MedicationAdministration,
      ZtrackingMedicationAdministration,
      TemperatureMeasurement,
      ZtrackingTemperatureMeasurement,
      SymptomReport,
      ZtrackingSymptomReport,
    ]),
  ],
  controllers: [DiaperChangeController],
  providers: [
    DiaperChangeService,
    DiaperChangeKafkaService,
    ZtrackingDiaperChangeService,
    MedicationAdministrationService,
    MedicationAdministrationKafkaService,
    ZtrackingMedicationAdministrationService,
    TemperatureMeasurementService,
    TemperatureMeasurementKafkaService,
    ZtrackingTemperatureMeasurementService,
    SymptomReportService,
    SymptomReportKafkaService,
    ZtrackingSymptomReportService,
  ],
})
export class CareModule {
  private logger = getLoggerConfig(CareModule.name);
  constructor() {
    this.logger.debug(
      `${CareModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
