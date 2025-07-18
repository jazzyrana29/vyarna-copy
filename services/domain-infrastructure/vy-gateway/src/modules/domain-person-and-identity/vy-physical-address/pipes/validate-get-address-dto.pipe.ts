import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { GetOnePersonDto } from 'ez-utils';

@Injectable()
export class ValidateGetAddressDtoPipe implements PipeTransform {
  transform(value: GetOnePersonDto, metadata: ArgumentMetadata) {
    if (!value.personId) {
      throw new BadRequestException('personId is required');
    }
    return value;
  }
}
