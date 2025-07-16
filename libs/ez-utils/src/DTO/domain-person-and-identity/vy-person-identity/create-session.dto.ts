import { PickType } from '@nestjs/swagger';
import { SessionDto } from './session.dto';

export class CreateSessionDto extends PickType(SessionDto, [
  'personId',
  'ipAddress',
  'location',
] as const) {}
