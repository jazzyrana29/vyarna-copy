import { PickType } from '@nestjs/swagger';
import { EmailDto } from './email.dto';

export class GetZtrackingEmailDto extends PickType(EmailDto, ['emailId'] as const) {}
