import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { KafkaModule } from './utils/kafka/kafka.module';


import { getLoggerConfig } from './utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    KafkaModule,
  ],
  providers: [],
})
export class AppModule {
  private logger = getLoggerConfig(AppModule.name);

  constructor() {
    this.logger.debug(
      `${AppModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
