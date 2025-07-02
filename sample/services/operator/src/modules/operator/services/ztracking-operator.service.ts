import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { Operator } from '../../../entities/operator.entity';
import { ZtrackingOperator } from '../../../entities/ztracking-operator.entity';
import { GetHistoryOfOperatorDto } from 'ez-utils';

@Injectable()
export class ZtrackingOperatorService {
  private logger = getLoggerConfig(ZtrackingOperatorService.name);

  constructor(
    @InjectRepository(ZtrackingOperator)
    private ztrackingOperatorRepository: Repository<ZtrackingOperator>,
  ) {
    this.logger.debug(
      `${ZtrackingOperatorService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingOperatorEntity(
    operator: Operator,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingBusinessUnit = await this.ztrackingOperatorRepository.save(
      this.ztrackingOperatorRepository.create({
        ...operator,
        versionDate: new Date(),
      }),
    );
    this.logger.info(
      `ztracking operator entity saved in database`,
      traceId,
      'createZtrackingOperatorEntity',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingBusinessUnit?.ztrackingVersion);
  }

  async findZtrackingOperatorEntity(
    { operatorId }: GetHistoryOfOperatorDto,
    traceId: string,
  ): Promise<ZtrackingOperator[]> {
    const ztrackingOperators = await this.ztrackingOperatorRepository.find({
      where: { operatorId },
    });

    if (!ztrackingOperators.length) {
      throw new NotFoundException(
        `no ztracking of operators existed with this id => ${operatorId}`,
      );
    }

    this.logger.info(
      `ztracking operators entities found in database`,
      traceId,
      'findZtrackingOperatorEntity',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingOperators;
  }
}
