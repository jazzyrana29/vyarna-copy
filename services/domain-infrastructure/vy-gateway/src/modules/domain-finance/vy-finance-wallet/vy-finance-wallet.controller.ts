import { Body, Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { FinanceWalletKafkaService } from './microservices/vy-finance-wallet-kafka.service';
import { ValidateCreateWalletAccountDtoPipe } from './pipes/validate-create-wallet-account-dto.pipe';
import { ValidateScheduleProviderPayoutDtoPipe } from './pipes/validate-schedule-provider-payout-dto.pipe';
import { ValidateIssueConsumerRewardDtoPipe } from './pipes/validate-issue-consumer-reward-dto.pipe';
import { ValidateCreateAffiliateCommissionDtoPipe } from './pipes/validate-create-affiliate-commission-dto.pipe';
import { ValidateCreateInternalChargeDtoPipe } from './pipes/validate-create-internal-charge-dto.pipe';
import {
  generateTraceId,
  CreateWalletAccountDto,
  ScheduleProviderPayoutDto,
  IssueConsumerRewardDto,
  CreateAffiliateCommissionDto,
  CreateInternalChargeDto,
} from 'ez-utils';

@UseInterceptors(SentryInterceptor)
@ApiTags('vy-finance-wallet')
@Controller('vy-finance-wallet')
export class FinanceWalletController {
  private logger = getLoggerConfig(FinanceWalletController.name);

  constructor(private readonly walletKafkaService: FinanceWalletKafkaService) {
    this.logger.debug(
      `${FinanceWalletController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post('accounts')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateWalletAccountDto })
  async createAccount(
    @Body(new ValidateCreateWalletAccountDtoPipe()) createWalletAccountDto: CreateWalletAccountDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createWalletAccount');
    this.logger.info('traceId generated successfully', traceId, 'createWalletAccount', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.walletKafkaService.createWalletAccount(createWalletAccountDto, traceId),
      'Wallet account created',
      traceId,
    );
  }

  @Post('provider-payouts')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: ScheduleProviderPayoutDto })
  async scheduleProviderPayout(
    @Body(new ValidateScheduleProviderPayoutDtoPipe()) scheduleProviderPayoutDto: ScheduleProviderPayoutDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('scheduleProviderPayout');
    this.logger.info('traceId generated successfully', traceId, 'scheduleProviderPayout', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.walletKafkaService.scheduleProviderPayout(scheduleProviderPayoutDto, traceId),
      'Provider payout scheduled',
      traceId,
    );
  }

  @Post('consumer-rewards')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: IssueConsumerRewardDto })
  async issueConsumerReward(
    @Body(new ValidateIssueConsumerRewardDtoPipe()) issueConsumerRewardDto: IssueConsumerRewardDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('issueConsumerReward');
    this.logger.info('traceId generated successfully', traceId, 'issueConsumerReward', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.walletKafkaService.issueConsumerReward(issueConsumerRewardDto, traceId),
      'Consumer reward issued',
      traceId,
    );
  }

  @Post('affiliate-commissions')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateAffiliateCommissionDto })
  async createAffiliateCommission(
    @Body(new ValidateCreateAffiliateCommissionDtoPipe()) createAffiliateCommissionDto: CreateAffiliateCommissionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createAffiliateCommission');
    this.logger.info('traceId generated successfully', traceId, 'createAffiliateCommission', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.walletKafkaService.createAffiliateCommission(createAffiliateCommissionDto, traceId),
      'Affiliate commission created',
      traceId,
    );
  }

  @Post('internal-charges')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateInternalChargeDto })
  async createInternalCharge(
    @Body(new ValidateCreateInternalChargeDtoPipe()) createInternalChargeDto: CreateInternalChargeDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createInternalCharge');
    this.logger.info('traceId generated successfully', traceId, 'createInternalCharge', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.walletKafkaService.createInternalCharge(createInternalChargeDto, traceId),
      'Internal charge created',
      traceId,
    );
  }
}
