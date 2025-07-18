import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UpdatePhysicalAddressDto } from 'ez-utils';

@Injectable()
export class ValidateUpdateAddressDtoPipe implements PipeTransform {
  transform(value: UpdatePhysicalAddressDto, metadata: ArgumentMetadata) {
    if (!value.addressId) {
      throw new BadRequestException('addressId is required');
    }
    return value;
  }
}
