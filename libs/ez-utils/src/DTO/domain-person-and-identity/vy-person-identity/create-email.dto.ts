import { PickType } from '@nestjs/swagger';
import { EmailDto } from './email.dto';

export class CreateEmailDto extends PickType(EmailDto, [
  'personId',
  'email',
  'isPrimary',
] as const) {}
