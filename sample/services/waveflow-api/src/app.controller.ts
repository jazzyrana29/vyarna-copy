import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards';
import { getLoggerConfig } from './utils/common';
import { LogStreamLevel } from 'ez-logger';
import { SentryInterceptor } from './interceptors/sentry.interceptor';

import { generateTraceId } from 'ez-utils';

import { AppService } from './app.service';

@UseInterceptors(SentryInterceptor)
@Controller()
export class AppController {
  private logger = getLoggerConfig(AppController.name);

  constructor(private readonly appService: AppService) {
    this.logger.debug(
      `${AppController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Get()
  getHello(): { hello } {
    const traceId = generateTraceId(AppController.name);

    console.log('I am groot');
    this.logger.log(
      'random message',
      traceId,
      'getHello',
      LogStreamLevel.ProdStandard,
    );
    console.log('I was groot');
    this.logger.warn(
      JSON.stringify({
        hello: this.appService.getHello(),
        correlationId: 'sdfaasdfararg',
        iterations: 17,
      }),
      traceId,
      'getHello',
      LogStreamLevel.ProdStandard,
    );
    return {
      hello: this.appService.getHello(),
    };
  }

  @Get('/error')
  getError(): string {
    const traceId = generateTraceId(AppController.name);
    this.logger.error(
      FORBIDDEN_MESSAGE,
      traceId,
      'getError',
      LogStreamLevel.ProdStandard,
    );
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
