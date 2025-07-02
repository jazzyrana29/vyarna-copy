import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateContactDto } from '../dto/create-contact.dto';

@Injectable()
export class ValidateCreateContactDtoPipe implements PipeTransform {
  transform(
    value: CreateContactDto,
    metadata: ArgumentMetadata,
  ): CreateContactDto {
    if (!value.firstName || !value.lastName || !value.email || !value.formId) {
      throw new BadRequestException(
        `You must provide all require fields. Got metadata=>${metadata}`,
      );
    } else return value;
  }
}
