import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';
import {
  KT_CREATE_WALLET_ACCOUNT,
  KT_SCHEDULE_PROVIDER_PAYOUT,
  KT_ISSUE_CONSUMER_REWARD,
  KT_CREATE_AFFILIATE_COMMISSION,
  KT_CREATE_INTERNAL_CHARGE,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller()
export class FinanceWalletResponseController {
  private logger = getLoggerConfig(FinanceWalletResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${FinanceWalletResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_WALLET_ACCOUNT + '-response')
  handleCreateAccount(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_WALLET_ACCOUNT} | key: ${key}`,
      '',
      'handleCreateAccount',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_SCHEDULE_PROVIDER_PAYOUT + '-response')
  handleSchedulePayout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_SCHEDULE_PROVIDER_PAYOUT} | key: ${key}`,
      '',
      'handleSchedulePayout',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_ISSUE_CONSUMER_REWARD + '-response')
  handleIssueReward(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_ISSUE_CONSUMER_REWARD} | key: ${key}`,
      '',
      'handleIssueReward',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CREATE_AFFILIATE_COMMISSION + '-response')
  handleCreateCommission(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_AFFILIATE_COMMISSION} | key: ${key}`,
      '',
      'handleCreateCommission',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CREATE_INTERNAL_CHARGE + '-response')
  handleCreateCharge(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_INTERNAL_CHARGE} | key: ${key}`,
      '',
      'handleCreateCharge',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
