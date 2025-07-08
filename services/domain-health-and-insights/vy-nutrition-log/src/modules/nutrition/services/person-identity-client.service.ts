import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { GetPersonDto, KT_GET_PERSON_ENTITY } from 'ez-utils';

@Injectable()
export class PersonIdentityClientService {
  private readonly serviceName = PersonIdentityClientService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async validatePerson(personId: string, traceId: string): Promise<void> {
    const dto = new GetPersonDto();
    dto.personId = personId;

    await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PERSON_ENTITY,
      dto,
      traceId,
    );
  }
}
