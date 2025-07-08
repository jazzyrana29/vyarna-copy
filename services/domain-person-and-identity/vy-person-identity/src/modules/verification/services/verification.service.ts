import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EzKafkaProducer, encodeKafkaMessage } from 'ez-utils';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import {
  StartIdentityVerificationDto,
  ReviewIdentityVerificationDto,
  VerificationStatusDto,
} from 'ez-utils';
import { IdentityVerification, VerificationStatus } from '../../../entities/identityVerification.entity';
import { Document } from '../../../entities/document.entity';

@Injectable()
export class VerificationService {
  private logger = getLoggerConfig(VerificationService.name);

  constructor(
    @InjectRepository(IdentityVerification)
    private readonly verificationRepo: Repository<IdentityVerification>,
    @InjectRepository(Document)
    private readonly documentRepo: Repository<Document>,
  ) {
    this.logger.debug(
      `${VerificationService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startVerification(dto: StartIdentityVerificationDto, traceId: string): Promise<IdentityVerification> {
    const verification = await this.verificationRepo.save(
      this.verificationRepo.create({ personId: dto.personId, status: VerificationStatus.PENDING }),
    );

    for (const doc of dto.documents) {
      await this.documentRepo.save(this.documentRepo.create({
        verificationId: verification.verificationId,
        type: doc.type,
        url: doc.url,
      }));
    }

    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      'KYCStarted',
      encodeKafkaMessage(VerificationService.name, {
        verificationId: verification.verificationId,
        personId: verification.personId,
        traceId,
      }),
    );

    this.logger.info('Verification started', traceId, 'startVerification', LogStreamLevel.ProdStandard);
    return verification;
  }

  async reviewVerification(dto: ReviewIdentityVerificationDto, traceId: string): Promise<IdentityVerification> {
    const entity = await this.verificationRepo.findOne({ where: { verificationId: dto.verificationId } });
    if (!entity) throw new NotFoundException(`no verification with id => ${dto.verificationId}`);

    const status = dto.status as VerificationStatus;
    await this.verificationRepo.update(dto.verificationId, {
      status,
      reviewedAt: new Date(),
    });
    const updated = await this.verificationRepo.findOne({ where: { verificationId: dto.verificationId } });

    if (status === VerificationStatus.APPROVED) {
      await new EzKafkaProducer().produce(
        process.env.KAFKA_BROKER as string,
        'IdentityVerified',
        encodeKafkaMessage(VerificationService.name, {
          verificationId: dto.verificationId,
          personId: entity.personId,
          traceId,
        }),
      );
    } else if (status === VerificationStatus.REJECTED) {
      await new EzKafkaProducer().produce(
        process.env.KAFKA_BROKER as string,
        'IdentityRejected',
        encodeKafkaMessage(VerificationService.name, {
          verificationId: dto.verificationId,
          personId: entity.personId,
          traceId,
        }),
      );
    }

    this.logger.info('Verification reviewed', traceId, 'reviewVerification', LogStreamLevel.ProdStandard);
    return updated!;
  }
}
