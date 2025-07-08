import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateMilestoneDto } from 'ez-utils';

@Injectable()
export class ValidateCreateMilestoneDtoPipe implements PipeTransform {
  transform(value: CreateMilestoneDto, _metadata: ArgumentMetadata) {
    const { babyId, personId, milestoneType, achievedAt } = value as any;
    if (!babyId || !personId || !milestoneType || !achievedAt) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
