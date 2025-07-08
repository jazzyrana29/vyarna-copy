import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateWalletAccountDto } from 'ez-utils';

@Injectable()
export class ValidateCreateWalletAccountDtoPipe implements PipeTransform {
  transform(value: CreateWalletAccountDto, metadata: ArgumentMetadata) {
    const { personId, type, currency } = value as any;
    if (!personId || !type || !currency) {
      throw new BadRequestException('Missing required fields');
    }
    return value;
  }
}
