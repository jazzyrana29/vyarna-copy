import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UpdateBusinessUnitDto } from 'ez-utils';

@Injectable()
export class ValidateUpdateBusinessUnitDtoPipe implements PipeTransform {
  transform(value: UpdateBusinessUnitDto, metadata: ArgumentMetadata) {
    const { businessUnitId, parentBusinessUnitId, children, ...rest } = value;

    if (!businessUnitId) {
      throw new BadRequestException('You must provide businessUnitId');
    }

    return value;
  }
}
