import { Injectable, NestMiddleware } from '@nestjs/common';
import * as morgan from 'morgan';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  public constructor() {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, baseUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const { statusCode } = response;

    const logger = morgan('combined', {
      stream: {
        write: () => {
          console.debug(
            ` \`Method: ${method}, To: ${baseUrl}, ResponseCode: ${statusCode},  UserAgent: - ${userAgent} ${ip}, Body: ${JSON.stringify(request.body)}\``,
          );
        },
      },
    });

    logger(request, response, next);
  }
}
