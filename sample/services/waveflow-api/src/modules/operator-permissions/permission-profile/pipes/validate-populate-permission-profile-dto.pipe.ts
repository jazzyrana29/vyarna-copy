import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { PopulatePermissionProfileDto } from 'ez-utils';

@Injectable()
export class ValidatePopulatePermissionProfileDtoPipe implements PipeTransform {
  transform(value: PopulatePermissionProfileDto, metadata: ArgumentMetadata) {
    const {
      permissionProfileId,
      operatorPermissionProfiles,
      permissionProfileManagedThroughMechanismPermits,
    } = value;

    // Transform logic (skeleton, to be filled based on specific needs)
    if (!permissionProfileId)
      throw new BadRequestException('You must provide permissionProfileId');

    // Here, perform any transformation or validation on the incoming DTO
    return {
      permissionProfileId: permissionProfileId.trim(), // Example of sanitization
      operatorPermissionProfiles: operatorPermissionProfiles || [], // Ensure arrays are defaulted
      permissionProfileManagedThroughMechanismPermits:
        permissionProfileManagedThroughMechanismPermits || [], // Ensure arrays are defaulted
    };
  }
}
