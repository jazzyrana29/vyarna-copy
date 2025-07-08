import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { GetCategoriesDto } from 'ez-utils';

@Injectable()
export class ValidateGetCategoriesDtoPipe implements PipeTransform {
  transform(value: GetCategoriesDto, _metadata: ArgumentMetadata) {
    return value;
  }
}
