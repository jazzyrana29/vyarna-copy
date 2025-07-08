import { PickType } from '@nestjs/swagger';
import { EmailDto } from './email.dto';

export class GetEmailDto extends PickType(EmailDto, ['emailId'] as const) {}
