// src/contact/contact.module.ts
import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { PersonContactGateway } from './vy-person-contact.gateway';

@Module({
  controllers: [ContactController],
  providers: [ContactService, PersonContactGateway],
})
export class PersonContactModule {}
