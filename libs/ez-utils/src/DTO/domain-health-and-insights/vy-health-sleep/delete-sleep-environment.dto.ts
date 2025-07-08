import { PickType } from '@nestjs/swagger';
import { SleepEnvironmentDto } from './sleep-environment.dto';

export class DeleteSleepEnvironmentDto extends PickType(SleepEnvironmentDto, ['envId'] as const) {}
