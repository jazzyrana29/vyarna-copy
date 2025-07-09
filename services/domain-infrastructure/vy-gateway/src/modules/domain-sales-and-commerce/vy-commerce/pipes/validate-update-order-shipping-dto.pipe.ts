import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateOrderShippingDto } from 'ez-utils';

@Injectable()
export class ValidateUpdateOrderShippingDtoPipe implements PipeTransform {
  transform(value: UpdateOrderShippingDto, _metadata: ArgumentMetadata) {
    const { orderId, provider, method, trackingNumber } = value as any;
    if (!orderId || !provider || !method || !trackingNumber) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
