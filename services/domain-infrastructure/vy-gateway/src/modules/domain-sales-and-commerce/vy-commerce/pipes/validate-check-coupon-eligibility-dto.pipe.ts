import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CheckCouponEligibilityPayloadDto } from 'ez-utils';

@Injectable()
export class ValidateCheckCouponEligibilityDtoPipe implements PipeTransform {
  transform(value: CheckCouponEligibilityPayloadDto, _metadata: ArgumentMetadata) {
    return value;
  }
}
