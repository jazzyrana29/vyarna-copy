import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentIntentService } from './services/payment-intent.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('payments')
export class PaymentController {
  private logger = getLoggerConfig(PaymentController.name);

  constructor(private readonly paymentService: PaymentIntentService) {
    this.logger.debug(
      `${PaymentController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern('payments.create')
  async create(@Payload() data: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    await this.paymentService.create(data, key);
  }

  @MessagePattern('payments.list')
  async list(@Payload() _data: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    await this.paymentService.findAll(key);
  }
}
