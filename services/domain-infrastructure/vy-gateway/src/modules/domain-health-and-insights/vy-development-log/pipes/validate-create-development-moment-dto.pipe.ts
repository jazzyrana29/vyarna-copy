import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateDevelopmentMomentDto } from 'ez-utils';

@Injectable()
export class ValidateCreateDevelopmentMomentDtoPipe implements PipeTransform {
  transform(value: CreateDevelopmentMomentDto, _metadata: ArgumentMetadata) {
    const { babyId, personId, title, timestamp } = value as any;
    if (!babyId || !personId || !title || !timestamp) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
