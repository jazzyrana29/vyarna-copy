// src/contact/contact.module.ts
import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { WebsocketGateway } from '../../gateway/websocket.gateway';

@Module({
  controllers: [ContactController],
  providers: [ContactService, WebsocketGateway],
})
export class ContactModule {}
