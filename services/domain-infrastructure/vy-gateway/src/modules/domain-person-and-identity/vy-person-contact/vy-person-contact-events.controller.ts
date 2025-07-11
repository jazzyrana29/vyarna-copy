import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { KT_CONTACT_CREATED } from 'ez-utils';
import { PersonContactWebsocket } from './vy-person-contact.gateway';
import { ClientMessagesMode } from '../../../constants/ClientMessagesMode';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller()
export class PersonContactEventsController {
  private logger = getLoggerConfig(PersonContactEventsController.name);

  constructor(private readonly websocket: PersonContactWebsocket) {
    this.logger.debug(
      `${PersonContactEventsController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  // The current implementation of CREATED broadcasts to all connected sockets
  // which is inefficient and insecure as it exposes user information to all
  // sockets. Disable listening to KT_CONTACT_CREATED until proper support
  // structure is implemented.
  // @MessagePattern(KT_CONTACT_CREATED)
  handleCreated(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    const traceId = message.traceId;
    this.logger.warn(
      `Skipped handling ${KT_CONTACT_CREATED} | key: ${key}`,
      traceId,
      'handleCreated',
      LogStreamLevel.DebugLight,
    );
    // this.websocket.server.emit(ClientMessagesMode.NEW_CONTACT_CREATED, message);
  }
}
