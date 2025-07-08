import { PickType } from '@nestjs/swagger';
import { SleepEnvironmentDto } from './sleep-environment.dto';

export class GetSleepEnvironmentsDto extends PickType(SleepEnvironmentDto, ['sessionId'] as const) {}
