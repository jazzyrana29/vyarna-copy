import { PickType } from '@nestjs/swagger';
import { PhysicalAddressDto } from './physical-address.dto';

export class UpdatePhysicalAddressDto extends PickType(PhysicalAddressDto, [
  'addressId',
  'addressType',
  'addressLine1',
  'addressLine2',
  'city',
  'state',
  'postalCode',
  'country',
  'isPrimary',
] as const) {}
