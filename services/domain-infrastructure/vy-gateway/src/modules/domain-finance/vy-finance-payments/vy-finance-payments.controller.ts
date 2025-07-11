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
import { ValidateGetPaymentRefundDtoPipe } from './pipes/validate-get-payment-refund-dto.pipe';
import { ValidateRetryPaymentAttemptDtoPipe } from './pipes/validate-retry-payment-attempt-dto.pipe';
import { ValidateCapturePaymentIntentDtoPipe } from './pipes/validate-capture-payment-intent-dto.pipe';
import { ValidateConfirmPaymentIntentDtoPipe } from './pipes/validate-confirm-payment-intent-dto.pipe';
import { ValidateCreateContactDtoPipe } from './pipes/validate-create-contact-dto.pipe';
import {
  generateTraceId,
  CreatePaymentIntentPayloadDto,
  GetPaymentIntentDto,
  GetZtrackingPaymentIntentDto,
  CreateRefundDto,
  GetPaymentRefundDto,
  RefundDto,
  ConfirmPaymentIntentDto,
  CapturePaymentIntentDto,
  CreatePaymentMethodDto,
  GetPaymentMethodsDto,
  DeletePaymentMethodDto,
  CreateStripeContactDto,
  RetryPaymentAttemptDto,
  KT_CREATE_PAYMENT_INTENT,
  KT_GET_PAYMENT_INTENT,
  KT_GET_ZTRACKING_PAYMENT_INTENT,
  KT_CONFIRM_PAYMENT_INTENT,
  KT_CAPTURE_PAYMENT_INTENT,
  KT_CREATE_REFUND,
  KT_GET_REFUND,
  KT_RETRY_PAYMENT_ATTEMPT,
  KT_CREATE_PAYMENT_METHOD,
  KT_LIST_PAYMENT_METHODS,
  KT_DELETE_PAYMENT_METHOD,
  KT_CREATE_CONTACT,
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
    createDto: CreatePaymentIntentPayloadDto,
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

  @Post(KT_GET_ZTRACKING_PAYMENT_INTENT)
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

  @Post(KT_CONFIRM_PAYMENT_INTENT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: ConfirmPaymentIntentDto })
  async confirmPaymentIntent(
    @Body(new ValidateConfirmPaymentIntentDtoPipe()) confirmDto: ConfirmPaymentIntentDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('confirmPaymentIntent');
    this.logger.info('traceId generated successfully', traceId, 'confirmPaymentIntent', LogStreamLevel.ProdStandard);
    await this.paymentsKafkaService.confirmPaymentIntent(confirmDto, traceId);
    return new ResponseDTO(HttpStatus.OK, null, 'Payment intent confirmed', traceId);
  }

  @Post(KT_CAPTURE_PAYMENT_INTENT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CapturePaymentIntentDto })
  async capturePaymentIntent(
    @Body(new ValidateCapturePaymentIntentDtoPipe()) captureDto: CapturePaymentIntentDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('capturePaymentIntent');
    this.logger.info('traceId generated successfully', traceId, 'capturePaymentIntent', LogStreamLevel.ProdStandard);
    await this.paymentsKafkaService.confirmPaymentIntent(captureDto, traceId);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.paymentsKafkaService.capturePaymentIntent(captureDto, traceId),
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

  @Post(KT_CREATE_CONTACT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateStripeContactDto })
  async createContact(
    @Body(new ValidateCreateContactDtoPipe()) createContactDto: CreateStripeContactDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createContact');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'createContact',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.paymentsKafkaService.createContact(createContactDto, traceId),
      'Contact created',
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
