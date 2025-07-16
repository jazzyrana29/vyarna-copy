import { PickType } from '@nestjs/swagger';
import { SessionDto } from './session.dto';

export class GetOneSessionDto extends PickType(SessionDto, ['sessionId'] as const) {}
