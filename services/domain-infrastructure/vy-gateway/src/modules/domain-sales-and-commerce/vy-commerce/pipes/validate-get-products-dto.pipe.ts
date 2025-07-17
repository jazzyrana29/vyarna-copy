import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { GetProductsDto } from 'ez-utils';

@Injectable()
export class ValidateGetProductsDtoPipe implements PipeTransform {
  transform(value: GetProductsDto, _metadata: ArgumentMetadata) {
    return value;
  }
}
