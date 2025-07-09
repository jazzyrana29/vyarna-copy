import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ApplyCartPromotionDto } from 'ez-utils';

@Injectable()
export class ValidateApplyCartPromotionDtoPipe implements PipeTransform {
  transform(value: ApplyCartPromotionDto, _metadata: ArgumentMetadata) {
    const { cartId, code } = value as any;
    if (!cartId || !code) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
