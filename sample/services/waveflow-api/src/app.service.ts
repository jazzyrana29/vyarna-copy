import { Injectable } from '@nestjs/common';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from './utils/common';

@Injectable()
export class AppService {
  private logger = getLoggerConfig(AppService.name);

  constructor() {
    this.logger.debug(
      `${AppService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getHello() {
    return 'Hello';
  }
}
