import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { SleepSessionService } from './services/sleep-session.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('sleep')
export class SleepController {
  private logger = getLoggerConfig(SleepController.name);

  constructor(private readonly sleepService: SleepSessionService) {
    this.logger.debug(
      `${SleepController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern('sleep.create')
  async create(@Payload() data: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    await this.sleepService.create(data, key);
  }

  @MessagePattern('sleep.list')
  async list(@Payload() _data: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    await this.sleepService.findAll(key);
  }
}
