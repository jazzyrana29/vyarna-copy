import { PickType } from '@nestjs/swagger';
import { PhysicalAddressDto } from './physical-address.dto';

export class CreatePhysicalAddressDto extends PickType(PhysicalAddressDto, [
  'personId',
  'addressType',
  'addressLine1',
  'addressLine2',
  'city',
  'state',
  'postalCode',
  'country',
  'isPrimary',
] as const) {}
