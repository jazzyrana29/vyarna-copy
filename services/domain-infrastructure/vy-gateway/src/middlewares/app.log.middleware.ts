import { Injectable, NestMiddleware } from '@nestjs/common';
import * as morgan from 'morgan';
import { NextFunction, Request, Response } from 'express';
import { KT_PROCESS_STRIPE_WEBHOOK } from 'ez-utils';

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
          const isStripeWebhook =
            baseUrl === `/webhooks/${KT_PROCESS_STRIPE_WEBHOOK}`;
          const body =
            isStripeWebhook && Buffer.isBuffer(request.body)
              ? request.body.toString()
              : JSON.stringify(request.body);
          console.debug(
            ` \`Method: ${method}, To: ${baseUrl}, ResponseCode: ${statusCode},  UserAgent: - ${userAgent} ${ip}, Body: ${body}\``,
          );
        },
      },
    });

    logger(request, response, next);
  }
}
