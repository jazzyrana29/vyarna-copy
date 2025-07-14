import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityVerification } from '../../entities/identity-verification.entity';
import { Document } from '../../entities/document.entity';
import { VerificationService } from './services/verification.service';
import { VerificationKafkaService } from './services/verification-kafka.service';
import { VerificationController } from './verification.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityVerification, Document])],
  controllers: [VerificationController],
  providers: [VerificationService, VerificationKafkaService],
})
export class VerificationModule {
  private logger = getLoggerConfig(VerificationModule.name);

  constructor() {
    this.logger.debug(
      `${VerificationModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
