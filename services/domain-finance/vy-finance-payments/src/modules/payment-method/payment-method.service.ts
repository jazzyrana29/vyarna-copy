import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StripeGatewayService } from '../../services/stripe-gateway.service';
import { PaymentMethod } from '../../entities/payment_method.entity';
import {
  CreatePaymentMethodDto,
  GetPaymentMethodsDto,
  DeletePaymentMethodDto,
  PaymentMethodDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class PaymentMethodService {
  private logger = getLoggerConfig(PaymentMethodService.name);

  constructor(
    @InjectRepository(PaymentMethod)
    private readonly methodRepo: Repository<PaymentMethod>,
    private readonly stripeGateway: StripeGatewayService,
  ) {
    this.logger.debug(
      `${PaymentMethodService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createPaymentMethod(
    createPaymentMethodDto: CreatePaymentMethodDto,
    traceId: string,
    stripeCustomerId?: string,
  ): Promise<PaymentMethodDto> {
    const entity = await this.methodRepo.save(
      this.methodRepo.create(createPaymentMethodDto),
    );

    if (
      stripeCustomerId &&
      process.env.STRIPE_ATTACH_PAYMENT_METHOD === 'true'
    ) {
      await this.stripeGateway.attachPaymentMethod(
        entity.externalId,
        stripeCustomerId,
        traceId,
      );
    }

    this.logger.info(
      'PaymentMethod created',
      traceId,
      'createPaymentMethod',
      LogStreamLevel.ProdStandard,
    );
    return entity;
  }

  async listPaymentMethods(
    getPaymentMethodsDto: GetPaymentMethodsDto,
    traceId: string,
  ): Promise<PaymentMethodDto[]> {
    const { personId } = getPaymentMethodsDto;
    const where = personId ? { personId } : {};
    const list = await this.methodRepo.find({ where });
    this.logger.info(
      `Retrieved ${list.length} payment methods`,
      traceId,
      'listPaymentMethods',
      LogStreamLevel.DebugLight,
    );
    return list;
  }

  async deletePaymentMethod(
    deletePaymentMethodDto: DeletePaymentMethodDto,
    traceId: string,
  ): Promise<void> {
    const { paymentMethodId } = deletePaymentMethodDto;
    await this.methodRepo.delete({ paymentMethodId });
    this.logger.info(
      'PaymentMethod deleted',
      traceId,
      'deletePaymentMethod',
      LogStreamLevel.ProdStandard,
    );
  }

}
