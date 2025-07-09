// src/contact/contact.controller.ts
import { Body, Controller, Get, Param, Post, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { FinancePaymentsKafkaService } from './microservices/vy-finance-payments-kafka.service';
import { ValidateCreatePaymentIntentDtoPipe } from './pipes/validate-create-payment-intent-dto.pipe';
import { ValidateGetZtrackingPaymentIntentDtoPipe } from './pipes/validate-get-ztracking-payment-intent-dto.pipe';
import { ValidateCreateRefundDtoPipe } from './pipes/validate-create-refund-dto.pipe';
import { ValidateCreatePaymentMethodDtoPipe } from './pipes/validate-create-payment-method-dto.pipe';
import {
  generateTraceId,
  CreatePaymentIntentDto,
  GetPaymentIntentDto,
  GetZtrackingPaymentIntentDto,
  CreateRefundDto,
  GetPaymentRefundDto,
  RefundDto,
  CreatePaymentMethodDto,
  GetPaymentMethodsDto,
  DeletePaymentMethodDto,
  RetryPaymentAttemptDto,
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

  @Post('payment-intents/:id')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getPaymentIntent(@Param('id') id: string): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getPaymentIntent');
    this.logger.info('traceId generated successfully', traceId, 'getPaymentIntent', LogStreamLevel.ProdStandard);
    const dto: GetPaymentIntentDto = { paymentIntentId: id } as GetPaymentIntentDto;
    return new ResponseDTO(
      HttpStatus.OK,
      await this.paymentsKafkaService.getPaymentIntent(dto, traceId),
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

  @Post('refunds/:id')
  @ApiCreatedResponse({ type: ResponseDTO<RefundDto> })
  async getPaymentRefund(@Param('id') id: string): Promise<ResponseDTO<RefundDto>> {
    const traceId = generateTraceId('getPaymentRefund');
    this.logger.info('traceId generated successfully', traceId, 'getPaymentRefund', LogStreamLevel.ProdStandard);
    const dto: GetPaymentRefundDto = { refundId: id } as GetPaymentRefundDto;
    const refund = await this.paymentsKafkaService.getRefund(dto, traceId);
    return new ResponseDTO(HttpStatus.OK, refund, 'Refund retrieved', traceId);
  }

  @Post('payment-attempts/:id/retry')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async retryPaymentAttempt(@Param('id') id: string): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('retryPaymentAttempt');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'retryPaymentAttempt',
      LogStreamLevel.ProdStandard,
    );
    const retryPaymentAttemptDto: RetryPaymentAttemptDto = {
      attemptId: id,
    } as RetryPaymentAttemptDto;
    const result = await this.paymentsKafkaService.retryPaymentAttempt(
      retryPaymentAttemptDto,
      traceId,
    );
    return new ResponseDTO(HttpStatus.OK, result, 'Retry scheduled', traceId);
  }

  @Post('payment-methods')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreatePaymentMethodDto })
  async createPaymentMethod(
    @Body(new ValidateCreatePaymentMethodDtoPipe())
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createPaymentMethod');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'createPaymentMethod',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.paymentsKafkaService.createPaymentMethod(
        createPaymentMethodDto,
        traceId,
      ),
      'Payment method created',
      traceId,
    );
  }

  @Post('payment-methods/get')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetPaymentMethodsDto })
  async listPaymentMethods(
    @Body() getPaymentMethodsDto: GetPaymentMethodsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('listPaymentMethods');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'listPaymentMethods',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.paymentsKafkaService.listPaymentMethods(
        getPaymentMethodsDto,
        traceId,
      ),
      'Payment methods retrieved',
      traceId,
    );
  }

  @Post('payment-methods/delete')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: DeletePaymentMethodDto })
  async deletePaymentMethod(
    @Body() deletePaymentMethodDto: DeletePaymentMethodDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('deletePaymentMethod');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'deletePaymentMethod',
      LogStreamLevel.ProdStandard,
    );
    await this.paymentsKafkaService.deletePaymentMethod(
      deletePaymentMethodDto,
      traceId,
    );
    return new ResponseDTO(HttpStatus.OK, null, 'Payment method deleted', traceId);
  }
}
