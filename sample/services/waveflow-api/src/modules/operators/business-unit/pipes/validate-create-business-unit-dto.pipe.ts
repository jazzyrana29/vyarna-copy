import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateBusinessUnitDto } from 'ez-utils';

@Injectable()
export class ValidateCreateBusinessUnitDtoPipe implements PipeTransform {
  transform(value: CreateBusinessUnitDto, metadata: ArgumentMetadata) {
    const { parentBusinessUnitId, children, ...rest } = value;
    return value;
  }
}
