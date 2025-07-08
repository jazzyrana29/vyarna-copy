import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from '../../entities/email.entity';
import { ZtrackingEmail } from '../../entities/ztracking-email.entity';
import { EmailController } from './email.controller';
import { EmailKafkaService } from './services/email-kafka.service';
import { EmailService } from './services/email.service';
import { ZtrackingEmailService } from './services/ztracking-email.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [TypeOrmModule.forFeature([Email, ZtrackingEmail])],
  controllers: [EmailController],
  providers: [EmailService, EmailKafkaService, ZtrackingEmailService],
})
export class EmailModule {
  private logger = getLoggerConfig(EmailModule.name);
  constructor() {
    this.logger.debug(
      `${EmailModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
