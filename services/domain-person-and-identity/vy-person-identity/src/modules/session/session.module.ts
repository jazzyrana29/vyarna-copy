import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../../entities/session.entity';
import { SessionService } from './services/session.service';
import { SessionKafkaService } from './services/session-kafka.service';
import { SessionController } from './session.controller';
import { Person } from '../../entities/person.entity';
import { Email } from '../../entities/email.entity';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Person, Email])],
  controllers: [SessionController],
  providers: [SessionService, SessionKafkaService],
})
export class SessionModule {
  private logger = getLoggerConfig(SessionModule.name);
  constructor() {
    this.logger.debug(
      `${SessionModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
