// src/contact/contact.controller.ts
import { Body, Controller, Post, HttpStatus, UseInterceptors } from '@nestjs/common';
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
import { ValidateGetPaymentIntentDtoPipe } from './pipes/validate-get-payment-intent-dto.pipe';
import { ValidateGetPaymentIntentStatusDtoPipe } from './pipes/validate-get-payment-intent-status-dto.pipe';
import { ValidateGetPaymentRefundDtoPipe } from './pipes/validate-get-payment-refund-dto.pipe';
import { ValidateRetryPaymentAttemptDtoPipe } from './pipes/validate-retry-payment-attempt-dto.pipe';
import { ValidateCapturePaymentIntentDtoPipe } from './pipes/validate-capture-payment-intent-dto.pipe';
import { ValidateConfirmPaymentIntentDtoPipe } from './pipes/validate-confirm-payment-intent-dto.pipe';
import {
  generateTraceId,
  CreatePaymentIntentPayloadDto,
  GetPaymentIntentDto,
  GetPaymentIntentStatusDto,
  GetZtrackingPaymentIntentDto,
  CreateRefundDto,
  GetPaymentRefundDto,
  RefundDto,
  ConfirmPaymentIntentDto,
  ConfirmedPaymentIntentDto,
  CapturePaymentIntentDto,
  CreatePaymentMethodDto,
  GetPaymentMethodsDto,
  DeletePaymentMethodDto,
  RetryPaymentAttemptDto,
  PaymentStatusUpdateDto,
  KT_CREATE_PAYMENT_INTENT,
  KT_GET_PAYMENT_INTENT,
  KT_GET_PAYMENT_INTENT_STATUS,
  KT_GET_ZTRACKING_PAYMENT_INTENT,
  KT_CONFIRM_PAYMENT_INTENT,
  KT_CAPTURE_PAYMENT_INTENT,
  KT_CREATE_REFUND,
  KT_GET_REFUND,
  KT_RETRY_PAYMENT_ATTEMPT,
  KT_CREATE_PAYMENT_METHOD,
  KT_LIST_PAYMENT_METHODS,
  KT_DELETE_PAYMENT_METHOD,
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

  @Post(KT_CREATE_PAYMENT_INTENT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreatePaymentIntentPayloadDto })
  async createPaymentIntent(
    @Body(new ValidateCreatePaymentIntentDtoPipe())
    createPaymentIntentPayloadDto: CreatePaymentIntentPayloadDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createPaymentIntent');
    this.logger.info('traceId generated successfully', traceId, 'createPaymentIntent', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.paymentsKafkaService.createPaymentIntent(
        createPaymentIntentPayloadDto,
        traceId,
      ),
      'Payment intent created',
      traceId,
    );
  }

  @Post(KT_GET_PAYMENT_INTENT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetPaymentIntentDto })
  async getPaymentIntent(
    @Body(new ValidateGetPaymentIntentDtoPipe()) getPaymentIntentDto: GetPaymentIntentDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getPaymentIntent');
    this.logger.info('traceId generated successfully', traceId, 'getPaymentIntent', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.paymentsKafkaService.getPaymentIntent(getPaymentIntentDto, traceId),
      'Payment intent retrieved',
      traceId,
    );
  }

  @Post(KT_GET_PAYMENT_INTENT_STATUS)
  @ApiCreatedResponse({ type: ResponseDTO<PaymentStatusUpdateDto> })
  @ApiBody({ type: GetPaymentIntentStatusDto })
  async getPaymentIntentStatus(
    @Body(new ValidateGetPaymentIntentStatusDtoPipe())
    getPaymentIntentStatusDto: GetPaymentIntentStatusDto,
  ): Promise<ResponseDTO<PaymentStatusUpdateDto>> {
    const traceId = generateTraceId('getPaymentIntentStatus');
    this.logger.info('traceId generated successfully', traceId, 'getPaymentIntentStatus', LogStreamLevel.ProdStandard);
    const result = await this.paymentsKafkaService.getPaymentIntentStatus(
      getPaymentIntentStatusDto,
      traceId,
    );
    return new ResponseDTO(HttpStatus.OK, result, 'Status retrieved', traceId);
  }

  @Post(KT_GET_ZTRACKING_PAYMENT_INTENT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetZtrackingPaymentIntentDto })
  async getZtrackingPaymentIntent(
    @Body(new ValidateGetZtrackingPaymentIntentDtoPipe())
    getZtrackingPaymentIntentDto: GetZtrackingPaymentIntentDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getZtrackingPaymentIntent');
    this.logger.info('traceId generated successfully', traceId, 'getZtrackingPaymentIntent', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.paymentsKafkaService.getZtrackingPaymentIntent(
        getZtrackingPaymentIntentDto,
        traceId,
      ),
      'Ztracking retrieved',
      traceId,
    );
  }

  @Post(KT_CONFIRM_PAYMENT_INTENT)
  @ApiCreatedResponse({ type: ResponseDTO<ConfirmedPaymentIntentDto> })
  @ApiBody({ type: ConfirmPaymentIntentDto })
  async confirmPaymentIntent(
    @Body(new ValidateConfirmPaymentIntentDtoPipe())
    confirmPaymentIntentDto: ConfirmPaymentIntentDto,
  ): Promise<ResponseDTO<ConfirmedPaymentIntentDto>> {
    const traceId = generateTraceId('confirmPaymentIntent');
    this.logger.info('traceId generated successfully', traceId, 'confirmPaymentIntent', LogStreamLevel.ProdStandard);
    const result = await this.paymentsKafkaService.confirmPaymentIntent(
      confirmPaymentIntentDto,
      traceId,
    );
    return new ResponseDTO(HttpStatus.OK, result, 'Payment intent confirmed', traceId);
  }

  @Post(KT_CAPTURE_PAYMENT_INTENT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CapturePaymentIntentDto })
  async capturePaymentIntent(
    @Body(new ValidateCapturePaymentIntentDtoPipe())
    capturePaymentIntentDto: CapturePaymentIntentDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('capturePaymentIntent');
    this.logger.info('traceId generated successfully', traceId, 'capturePaymentIntent', LogStreamLevel.ProdStandard);
    await this.paymentsKafkaService.confirmPaymentIntent(
      capturePaymentIntentDto as unknown as ConfirmPaymentIntentDto,
      traceId,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.paymentsKafkaService.capturePaymentIntent(
        capturePaymentIntentDto,
        traceId,
      ),
      'Capture scheduled',
      traceId,
    );
  }

  @Post(KT_CREATE_REFUND)
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

  @Post(KT_GET_REFUND)
  @ApiCreatedResponse({ type: ResponseDTO<RefundDto> })
  @ApiBody({ type: GetPaymentRefundDto })
  async getPaymentRefund(
    @Body(new ValidateGetPaymentRefundDtoPipe()) getPaymentRefundDto: GetPaymentRefundDto,
  ): Promise<ResponseDTO<RefundDto>> {
    const traceId = generateTraceId('getPaymentRefund');
    this.logger.info('traceId generated successfully', traceId, 'getPaymentRefund', LogStreamLevel.ProdStandard);
    const refund = await this.paymentsKafkaService.getRefund(getPaymentRefundDto, traceId);
    return new ResponseDTO(HttpStatus.OK, refund, 'Refund retrieved', traceId);
  }

  @Post(KT_RETRY_PAYMENT_ATTEMPT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: RetryPaymentAttemptDto })
  async retryPaymentAttempt(
    @Body(new ValidateRetryPaymentAttemptDtoPipe()) retryPaymentAttemptDto: RetryPaymentAttemptDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('retryPaymentAttempt');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'retryPaymentAttempt',
      LogStreamLevel.ProdStandard,
    );
    const result = await this.paymentsKafkaService.retryPaymentAttempt(
      retryPaymentAttemptDto,
      traceId,
    );
    return new ResponseDTO(HttpStatus.OK, result, 'Retry scheduled', traceId);
  }

  @Post(KT_CREATE_PAYMENT_METHOD)
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


  @Post(KT_LIST_PAYMENT_METHODS)
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

  @Post(KT_DELETE_PAYMENT_METHOD)
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
