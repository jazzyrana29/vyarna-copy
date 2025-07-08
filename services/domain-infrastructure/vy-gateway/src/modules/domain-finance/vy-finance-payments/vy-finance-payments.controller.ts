// src/contact/contact.controller.ts
import { Body, Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { FinancePaymentsKafkaService } from './microservices/vy-finance-payments-kafka.service';
import { ValidateCreatePaymentIntentDtoPipe } from './pipes/validate-create-payment-intent-dto.pipe';
import { ValidateGetPaymentIntentDtoPipe } from './pipes/validate-get-payment-intent-dto.pipe';
import { ValidateGetZtrackingPaymentIntentDtoPipe } from './pipes/validate-get-ztracking-payment-intent-dto.pipe';
import { ValidateCreateRefundDtoPipe } from './pipes/validate-create-refund-dto.pipe';
import { ValidateGetPaymentRefundDtoPipe } from './pipes/validate-get-payment-refund-dto.pipe';
import {
  generateTraceId,
  CreatePaymentIntentDto,
  GetPaymentIntentDto,
  GetZtrackingPaymentIntentDto,
  CreateRefundDto,
  GetPaymentRefundDto,
  RefundDto,
} from 'ez-utils';

@UseInterceptors(SentryInterceptor)
@ApiTags('vy-finance-payments')
@Controller('vy-finance-payments')
export class FinancePaymentsController {
  private logger = getLoggerConfig(FinancePaymentsController.name);

  constructor(private readonly paymentsKafkaService: FinancePaymentsKafkaService) {
    this.logger.debug(
      `${FinancePaymentsController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post('payment-intents')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreatePaymentIntentDto })
  async createPaymentIntent(
    @Body(new ValidateCreatePaymentIntentDtoPipe())
    createDto: CreatePaymentIntentDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createPaymentIntent');
    this.logger.info('traceId generated successfully', traceId, 'createPaymentIntent', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.paymentsKafkaService.createPaymentIntent(createDto, traceId),
      'Payment intent created',
      traceId,
    );
  }

  @Post('payment-intents/get')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetPaymentIntentDto })
  async getPaymentIntent(
    @Body(new ValidateGetPaymentIntentDtoPipe()) getDto: GetPaymentIntentDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getPaymentIntent');
    this.logger.info('traceId generated successfully', traceId, 'getPaymentIntent', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.paymentsKafkaService.getPaymentIntent(getDto, traceId),
      'Payment intent retrieved',
      traceId,
    );
  }

  @Post('payment-intents/ztracking')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetZtrackingPaymentIntentDto })
  async getZtrackingPaymentIntent(
    @Body(new ValidateGetZtrackingPaymentIntentDtoPipe()) getDto: GetZtrackingPaymentIntentDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getZtrackingPaymentIntent');
    this.logger.info('traceId generated successfully', traceId, 'getZtrackingPaymentIntent', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.paymentsKafkaService.getZtrackingPaymentIntent(getDto, traceId),
      'Ztracking retrieved',
      traceId,
    );
  }

  @Post('refunds')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateRefundDto })
  async createRefund(
    @Body(new ValidateCreateRefundDtoPipe()) createRefundDto: CreateRefundDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createRefund');
    this.logger.info('traceId generated successfully', traceId, 'createRefund', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.paymentsKafkaService.createRefund(createRefundDto, traceId),
      'Refund created',
      traceId,
    );
  }

  @Post('payment-refunds/get')
  @ApiCreatedResponse({ type: ResponseDTO<RefundDto> })
  @ApiBody({ type: GetPaymentRefundDto })
  async getPaymentRefund(
    @Body(new ValidateGetPaymentRefundDtoPipe())
    getPaymentRefundDto: GetPaymentRefundDto,
  ): Promise<ResponseDTO<RefundDto>> {
    const traceId = generateTraceId('getPaymentRefund');
    this.logger.info('traceId generated successfully', traceId, 'getPaymentRefund', LogStreamLevel.ProdStandard);
    const refund = await this.paymentsKafkaService.getRefund(getPaymentRefundDto, traceId);
    return new ResponseDTO(HttpStatus.OK, refund, 'Refund retrieved', traceId);
  }
}
