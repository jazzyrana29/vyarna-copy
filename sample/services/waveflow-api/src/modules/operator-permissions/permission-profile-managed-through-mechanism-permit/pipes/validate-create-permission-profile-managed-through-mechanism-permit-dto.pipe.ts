import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';

import { CreatePermissionProfileManagedThroughMechanismPermitDto } from 'ez-utils';

@Injectable()
export class ValidateCreatePermissionProfileManagedThroughMechanismPermitDtoPipe
  implements PipeTransform
{
  async transform(
    value: CreatePermissionProfileManagedThroughMechanismPermitDto,
    metadata: ArgumentMetadata,
  ) {
    // Create an instance of the DTO class and populate it with the value
    const dto = Object.assign(
      new CreatePermissionProfileManagedThroughMechanismPermitDto(),
      value,
    );

    // Validate the instance against the decorators
    const errors = await validate(dto);

    if (errors.length > 0) {
      // Collect all error messages
      const messages = errors
        .map((err) => Object.values(err.constraints))
        .flat();
      throw new BadRequestException(messages);
    }

    // Return the validated object
    return dto;
  }
}
