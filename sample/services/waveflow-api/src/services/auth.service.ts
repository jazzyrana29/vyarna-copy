import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { getLoggerConfig } from '../utils/common';
import { OperatorDto, OperatorSessionDto } from 'ez-utils';
import { CACHE_KEY_CURRENT_OPERATOR_ID } from '../constants/cache-keys.constant';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class AuthService {
  private logger = getLoggerConfig(AuthService.name);
  static loginOperatorSession: any;

  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async loginOperatorSession(
    operatorSessionDto: OperatorSessionDto,
  ): Promise<{ barerToken: string; operatorSession: OperatorSessionDto }> {
    const { operator = {} as OperatorDto } = operatorSessionDto;
    const payload = {
      sub: operator?.operatorId,
      operatorSession: operatorSessionDto,
    };

    await this.cacheManager.set(CACHE_KEY_CURRENT_OPERATOR_ID, payload.sub);
    await this.cacheManager.set(payload.sub, payload.operatorSession);

    const barerToken = this.jwtService.sign(payload);
    const { ...withoutPasswordOperator } = payload.operatorSession.operator;
    this.logger.log(
      `Token Assigned => ${barerToken}`,
      '',
      'loginOperatorSession',
      LogStreamLevel.ProdStandard,
    );
    return {
      barerToken,
      operatorSession: {
        ...operatorSessionDto,
        operator: withoutPasswordOperator,
      } as OperatorSessionDto,
    };
  }

  async getCurrentOperator(): Promise<OperatorSessionDto> {
    const currentOperatorId: string = await this.cacheManager.get(
      CACHE_KEY_CURRENT_OPERATOR_ID,
    );

    this.logger.info(
      `Cached operatorId: ${currentOperatorId}`,
      '',
      'getLoggedInUser',
      LogStreamLevel.ProdStandard,
    );

    if (currentOperatorId)
      return await this.cacheManager.get(currentOperatorId);

    throw new NotFoundException('operatorId not found in cache');
  }
}
