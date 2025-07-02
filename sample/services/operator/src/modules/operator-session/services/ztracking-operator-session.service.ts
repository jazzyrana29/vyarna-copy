import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZtrackingOperatorSession } from '../../../entities/ztracking-operator-session.entity';
import { OperatorSession } from '../../../entities/operator-session.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { GetHistoryOfOperatorSessionDto } from 'ez-utils';

@Injectable()
export class ZtrackingOperatorSessionService {
  private logger = getLoggerConfig(ZtrackingOperatorSessionService.name);

  constructor(
    @InjectRepository(ZtrackingOperatorSession)
    private ztrackingOperatorSessionRepository: Repository<ZtrackingOperatorSession>,
  ) {
    this.logger.debug(
      `${ZtrackingOperatorSessionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingOperatorSessionEntity(
    operatorSession: OperatorSession,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingOperatorSession =
      await this.ztrackingOperatorSessionRepository.save(
        this.ztrackingOperatorSessionRepository.create({
          ...operatorSession,
          deviceSessionId: operatorSession?.deviceSession?.deviceSessionId,
          operatorId: operatorSession?.operator?.operatorId,
          versionDate: new Date(),
        }),
      );
    this.logger.info(
      `createZtrackingOperatorSessionEntity saved in database`,
      traceId,
      'createZtrackingOperatorSessionEntity',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingOperatorSession?.ztrackingVersion);
  }

  async findZtrackingOperatorSessionEntity(
    { operatorSessionId = '' }: GetHistoryOfOperatorSessionDto,
    traceId: string,
  ): Promise<ZtrackingOperatorSession[]> {
    if (!operatorSessionId)
      throw new BadRequestException('you must provide operatorSessionId');
    const where: FindOptionsWhere<ZtrackingOperatorSession> = {};
    if (operatorSessionId) where.operatorSessionId = operatorSessionId;
    const ztrackingOperatorSessions =
      await this.ztrackingOperatorSessionRepository.find({
        where,
      });

    if (!ztrackingOperatorSessions.length) {
      throw new NotFoundException(
        `no ztracking of operator session existed with this id => ${operatorSessionId}`,
      );
    }

    this.logger.info(
      `ztracking operator session entity found in database`,
      traceId,
      'findZtrackingOperatorSessionEntity',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingOperatorSessions;
  }
}
