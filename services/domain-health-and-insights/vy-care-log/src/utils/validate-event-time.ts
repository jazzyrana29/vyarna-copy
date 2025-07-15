import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';

export interface ValidateEventTimeOptions {
  repo: Repository<any>;
  babyId: string;
  eventTime: Date | string;
  errorMessage: string;
}

export async function validateEventTime({
  repo,
  babyId,
  eventTime,
  errorMessage,
}: ValidateEventTimeOptions): Promise<void> {
  const latest = await repo.findOne({
    where: { babyId, isDeleted: false },
    order: { eventTime: 'DESC' },
  } as any);

  if (
    latest &&
    latest.eventTime.getTime() - new Date(eventTime).getTime() > 60 * 60 * 1000
  ) {
    throw new BadRequestException(errorMessage);
  }
}
