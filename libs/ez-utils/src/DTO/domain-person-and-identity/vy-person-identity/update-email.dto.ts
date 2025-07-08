import { PickType } from '@nestjs/swagger';
import { EmailDto } from './email.dto';

export class UpdateEmailDto extends PickType(EmailDto, [
  'emailId',
  'isVerified',
  'isPrimary',
] as const) {}
