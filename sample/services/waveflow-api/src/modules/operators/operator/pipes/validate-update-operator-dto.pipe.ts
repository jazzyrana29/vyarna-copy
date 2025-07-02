import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UpdateOperatorDto } from 'ez-utils';

@Injectable()
export class ValidateUpdateOperatorDtoPipe implements PipeTransform {
  transform(value: UpdateOperatorDto, metadata: ArgumentMetadata) {
    const { operatorId, ...rest } = value;

    if (!operatorId) {
      throw new BadRequestException('You must provide operatorId');
    }

    return value;
  }
}
