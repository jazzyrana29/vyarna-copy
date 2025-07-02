import { Injectable, NestMiddleware } from '@nestjs/common';
import * as morgan from 'morgan';
import { NextFunction, Request, Response } from 'express';
import { getLoggerConfig } from '../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = getLoggerConfig(AppLoggerMiddleware.name);

  public constructor() {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, baseUrl, body } = request;
    const userAgent = request.get('user-agent') || '';
    const { statusCode } = response;

    const logger = morgan('combined', {
      stream: {
        write: () => {
          this.logger.debug(
            ` \`Method: ${method}, To: ${baseUrl}, ResponseCode: ${statusCode},  UserAgent: - ${userAgent} ${ip}\``,
            '',
            'logger',
            LogStreamLevel.DebugLight,
          );
        },
      },
    });

    logger(request, response, next);
  }
}
