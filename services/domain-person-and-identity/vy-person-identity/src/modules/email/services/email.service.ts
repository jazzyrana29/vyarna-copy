import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from '../../../entities/email.entity';
import { ZtrackingEmailService } from './ztracking-email.service';
import {
  CreateEmailDto,
  EmailDto,
  GetOneEmailDto,
  UpdateEmailDto,
  GetZtrackingEmailDto,
  ZtrackingEmailDto,
  encodeKafkaMessage,
  KT_CONTACT_UPDATED,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { EzKafkaProducer } from 'ez-kafka-producer';

@Injectable()
export class EmailService {
  private logger = getLoggerConfig(EmailService.name);

  constructor(
    @InjectRepository(Email)
    private readonly emailRepo: Repository<Email>,
    private readonly ztrackingEmailService: ZtrackingEmailService,
  ) {
    this.logger.debug(
      `${EmailService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEmail(
    createEmailDto: CreateEmailDto,
    traceId: string,
  ): Promise<EmailDto> {
    const entity = this.emailRepo.create(createEmailDto);
    await this.emailRepo.save(entity);
    this.logger.info('Email created', traceId, 'createEmail', LogStreamLevel.ProdStandard);

    // The current implementation of CREATED broadcasts to all connected
    // sockets which is inefficient and insecure as it exposes user
    // information to all sockets. Disable producing KT_CONTACT_CREATED
    // until proper support structure is implemented.
    this.logger.warn(
      'Skipping KT_CONTACT_CREATED production: insecure broadcast',
      traceId,
      'createEmail',
      LogStreamLevel.DebugLight,
    );
    // await new EzKafkaProducer().produce(
    //   process.env.KAFKA_BROKER as string,
    //   KT_CONTACT_CREATED,
    //   encodeKafkaMessage(EmailService.name, {
    //     emailId: entity.emailId,
    //     personId: entity.personId,
    //     traceId,
    //   }),
    // );
    await this.ztrackingEmailService.createZtrackingEmail(entity, traceId);
    return entity;
  }

  async updateEmail(
    updateEmailDto: UpdateEmailDto,
    traceId: string,
  ): Promise<EmailDto> {
    const entity = await this.emailRepo.findOne({
      where: { emailId: updateEmailDto.emailId },
    });
    if (!entity) {
      throw new NotFoundException(
        `no email exists with id => ${updateEmailDto.emailId}`,
      );
    }
    await this.emailRepo.update(updateEmailDto.emailId, updateEmailDto);
    const updated = await this.emailRepo.findOne({
      where: { emailId: updateEmailDto.emailId },
    });
    this.logger.info('Email updated', traceId, 'updateEmail', LogStreamLevel.ProdStandard);
    if (updated) {
      await new EzKafkaProducer().produce(
        process.env.KAFKA_BROKER as string,
        KT_CONTACT_UPDATED,
        encodeKafkaMessage(EmailService.name, {
          emailId: updated.emailId,
          personId: updated.personId,
          traceId,
        }),
      );
      await this.ztrackingEmailService.createZtrackingEmail(updated, traceId);
    }
    return updated;
  }

  async getEmail(
    getOneEmailDto: GetOneEmailDto,
    traceId: string,
  ): Promise<EmailDto> {
    const entity = await this.emailRepo.findOne({
      where: { emailId: getOneEmailDto.emailId },
    });
    if (!entity) {
      throw new NotFoundException(
        `no email exists with id => ${getOneEmailDto.emailId}`,
      );
    }
    this.logger.info('Email retrieved', traceId, 'getEmail', LogStreamLevel.ProdStandard);
    return entity;
  }

  async getZtrackingEmail(
    getZtrackingEmailDto: GetZtrackingEmailDto,
    traceId: string,
  ): Promise<ZtrackingEmailDto[]> {
    return this.ztrackingEmailService.getZtrackingEmail(
      getZtrackingEmailDto,
      traceId,
    );
  }
}
