import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ValidatePromotionCodeDto } from 'ez-utils';

@Injectable()
export class ValidatePromotionCodeDtoPipe implements PipeTransform {
  transform(value: ValidatePromotionCodeDto, _metadata: ArgumentMetadata) {
    return value;
  }
}
