import { PickType } from '@nestjs/swagger';
import { ContactDto } from './contact.dto';

export class CreateContactDto extends PickType(ContactDto, [
  'firstName',
  'lastName',
  'email',
] as const) {}
