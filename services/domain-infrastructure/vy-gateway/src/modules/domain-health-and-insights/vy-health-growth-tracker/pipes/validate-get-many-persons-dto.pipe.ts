import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GetManyPersonsDto } from 'ez-utils';

@Injectable()
export class ValidateGetManyPersonsDtoPipe implements PipeTransform {
  transform(value: GetManyPersonsDto, metadata: ArgumentMetadata) {
    const { username, nameFirst, nameMiddle, nameLastFirst, nameLastSecond, emails, rootBusinessUnitId, isDeleted, updatedBy, pagination } = value;
    const hasFilters = !!username || !!nameFirst || !!nameMiddle || !!nameLastFirst || !!nameLastSecond || (Array.isArray(emails) && emails.length > 0) || !!rootBusinessUnitId || typeof isDeleted === 'boolean' || !!updatedBy;
    if (!hasFilters && !pagination) {
      throw new BadRequestException('Provide at least one filter or pagination.');
    }
    return value;
  }
}
