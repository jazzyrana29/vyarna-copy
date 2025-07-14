import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { GetProductsDto } from 'ez-utils';

@Injectable()
export class ValidateGetProductsDtoPipe implements PipeTransform {
  transform(value: GetProductsDto, _metadata: ArgumentMetadata) {
    if (!value.targetCurrency) {
      throw new BadRequestException('targetCurrency is required');
    }
    return value;
  }
}
