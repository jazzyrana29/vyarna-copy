import { PickType } from '@nestjs/swagger';
import { EmailDto } from './email.dto';

export class GetOneEmailDto extends PickType(EmailDto, ['emailId'] as const) {}
