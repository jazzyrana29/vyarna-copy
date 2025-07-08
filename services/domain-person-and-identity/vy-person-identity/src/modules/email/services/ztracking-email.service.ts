import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from '../../../entities/email.entity';
import { ZtrackingEmail } from '../../../entities/ztracking-email.entity';
import { GetZtrackingEmailDto } from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class ZtrackingEmailService {
  private logger = getLoggerConfig(ZtrackingEmailService.name);

  constructor(
    @InjectRepository(ZtrackingEmail)
    private readonly ztrackingRepo: Repository<ZtrackingEmail>,
  ) {
    this.logger.debug(
      `${ZtrackingEmailService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingEmail(email: Email, traceId: string): Promise<boolean> {
    const entity = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...email, versionDate: new Date() }),
    );
    this.logger.info(
      'ztracking email saved in database',
      traceId,
      'createZtrackingEmail',
      LogStreamLevel.ProdStandard,
    );
    return Boolean(entity?.ztrackingVersion);
  }

  async getZtrackingEmail(
    { emailId }: GetZtrackingEmailDto,
    traceId: string,
  ) {
    const entities = await this.ztrackingRepo.find({ where: { emailId } });
    if (!entities.length) {
      this.logger.error(
        `No ztracking emails found with this id => ${emailId}`,
        traceId,
        'getZtrackingEmail',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking emails found with this id => ${emailId}`,
      );
    }
    this.logger.info(
      `${entities.length} ztracking emails found in database`,
      traceId,
      'getZtrackingEmail',
      LogStreamLevel.ProdStandard,
    );
    return entities;
  }
}
