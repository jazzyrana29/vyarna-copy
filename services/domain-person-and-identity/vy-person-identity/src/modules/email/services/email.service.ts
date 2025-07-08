import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from '../../../entities/email.entity';
import { ZtrackingEmailService } from './ztracking-email.service';
import {
  CreateEmailDto,
  EmailDto,
  GetEmailDto,
  UpdateEmailDto,
  GetZtrackingEmailDto,
  ZtrackingEmailDto,
  encodeKafkaMessage,
  KT_CONTACT_CREATED,
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

  async createEmail(createDto: CreateEmailDto, traceId: string): Promise<EmailDto> {
    const entity = this.emailRepo.create(createDto);
    await this.emailRepo.save(entity);
    this.logger.info('Email created', traceId, 'createEmail', LogStreamLevel.ProdStandard);

    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_CONTACT_CREATED,
      encodeKafkaMessage(EmailService.name, {
        emailId: entity.emailId,
        personId: entity.personId,
        traceId,
      }),
    );
    await this.ztrackingEmailService.createZtrackingEmail(entity, traceId);
    return entity;
  }

  async updateEmail(updateDto: UpdateEmailDto, traceId: string): Promise<EmailDto> {
    const entity = await this.emailRepo.findOne({ where: { emailId: updateDto.emailId } });
    if (!entity) {
      throw new NotFoundException(`no email exists with id => ${updateDto.emailId}`);
    }
    await this.emailRepo.update(updateDto.emailId, updateDto);
    const updated = await this.emailRepo.findOne({ where: { emailId: updateDto.emailId } });
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

  async getEmail(getDto: GetEmailDto, traceId: string): Promise<EmailDto> {
    const entity = await this.emailRepo.findOne({ where: { emailId: getDto.emailId } });
    if (!entity) {
      throw new NotFoundException(`no email exists with id => ${getDto.emailId}`);
    }
    this.logger.info('Email retrieved', traceId, 'getEmail', LogStreamLevel.ProdStandard);
    return entity;
  }

  async getZtrackingEmail(
    getDto: GetZtrackingEmailDto,
    traceId: string,
  ): Promise<ZtrackingEmailDto[]> {
    return this.ztrackingEmailService.getZtrackingEmail(getDto, traceId);
  }
}
