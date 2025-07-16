import { PickType } from '@nestjs/swagger';
import { SessionDto } from './session.dto';

export class UpdateSessionDto extends PickType(SessionDto, [
  'sessionId',
  'personId',
  'ipAddress',
  'location',
] as const) {}
