import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetZtrackingOrderDto } from 'ez-utils';

@Injectable()
export class ValidateGetOrderDtoPipe implements PipeTransform {
  transform(value: GetZtrackingOrderDto, _metadata: ArgumentMetadata) {
    if (!(value as any).orderId) {
      throw new BadRequestException('orderId is required');
    }
    return value;
  }
}
