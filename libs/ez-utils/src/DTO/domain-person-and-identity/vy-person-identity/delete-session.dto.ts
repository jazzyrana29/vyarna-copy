import { PickType } from '@nestjs/swagger';
import { SessionDto } from './session.dto';

export class DeleteSessionDto extends PickType(SessionDto, ['sessionId'] as const) {}
