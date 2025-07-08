import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { SleepRating } from '../../../entities/sleep_rating.entity';
import { ZtrackingSleepRating } from '../../../entities/ztracking_sleep_rating.entity';
import { GetZtrackingSleepSessionDto, ZtrackingSleepRatingDto } from 'ez-utils';

@Injectable()
export class ZtrackingSleepRatingService {
  private logger = getLoggerConfig(ZtrackingSleepRatingService.name);

  constructor(
    @InjectRepository(ZtrackingSleepRating)
    private readonly ztrackingRepo: Repository<ZtrackingSleepRating>,
  ) {
    this.logger.debug(
      `${ZtrackingSleepRatingService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForSleepRating(rating: SleepRating, traceId: string): Promise<boolean> {
    const entity = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...rating, versionDate: new Date() }),
    );
    this.logger.info(
      `ztracking sleep rating saved in database`,
      traceId,
      'createZtrackingForSleepRating',
      LogStreamLevel.ProdStandard,
    );
    return Boolean(entity?.ztrackingVersion);
  }

  async getZtrackingForSleepRating(
    { sessionId = '' }: GetZtrackingSleepSessionDto,
    traceId: string,
  ): Promise<ZtrackingSleepRatingDto[]> {
    const entities = await this.ztrackingRepo.find({ where: { sessionId } });
    if (!entities.length) {
      this.logger.error(
        `No ztracking entities found with this session id => ${sessionId}`,
        traceId,
        'getZtrackingForSleepRating',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this session id => ${sessionId}`,
      );
    }
    this.logger.info(
      `${entities.length} ztracking sleep rating found in database`,
      traceId,
      'getZtrackingForSleepRating',
      LogStreamLevel.ProdStandard,
    );
    return entities;
  }
}
