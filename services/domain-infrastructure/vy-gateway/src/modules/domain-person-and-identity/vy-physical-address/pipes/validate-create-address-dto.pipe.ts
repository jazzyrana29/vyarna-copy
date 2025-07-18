import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreatePhysicalAddressDto } from 'ez-utils';

@Injectable()
export class ValidateCreateAddressDtoPipe implements PipeTransform {
  transform(value: CreatePhysicalAddressDto, metadata: ArgumentMetadata) {
    const { personId, addressLine1, city, state, postalCode, country } =
      value as any;
    if (
      !personId ||
      !addressLine1 ||
      !city ||
      !state ||
      !postalCode ||
      !country
    ) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
