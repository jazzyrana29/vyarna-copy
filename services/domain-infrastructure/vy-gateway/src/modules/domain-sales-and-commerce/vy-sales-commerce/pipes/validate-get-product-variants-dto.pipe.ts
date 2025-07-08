import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetProductVariantsDto } from 'ez-utils';

@Injectable()
export class ValidateGetProductVariantsDtoPipe implements PipeTransform {
  transform(value: GetProductVariantsDto, _metadata: ArgumentMetadata) {
    if (!(value as any).productId) {
      throw new BadRequestException('productId is required');
    }
    return value;
  }
}
