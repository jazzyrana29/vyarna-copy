import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { LogStreamLevel } from 'ez-logger';

import { getLoggerConfig } from '../../../utils/common';
import { OperatorPermissionProfile } from '../../../entities/operator-permission-profile.entity';
import {
  CreatePermissionProfileForAnOperatorDto,
  GetOperatorsForPermissionProfileDto,
  GetPermissionProfileForAnOperatorDto,
  IsOperatorAllowedToDto,
  OperatorPermissionProfileDto,
  PermissionProfileDto,
  RemovePermissionProfileForAnOperatorDto,
} from 'ez-utils';
import { PermissionProfileManagedThroughMechanismPermit } from '../../../entities/permission-profile-managed-through-mechanism-permit.entity';
import { ZtrackingOperatorPermissionProfileService } from './ztracking-operator-permission-profile.service';

@Injectable()
export class OperatorPermissionProfileService {
  private logger = getLoggerConfig(OperatorPermissionProfileService.name);

  constructor(
    @InjectRepository(OperatorPermissionProfile)
    private readonly operatorPermissionProfileRepository: Repository<OperatorPermissionProfile>,
    @InjectRepository(PermissionProfileManagedThroughMechanismPermit)
    private readonly permissionProfileManagedThroughMechanismPermitRepository: Repository<PermissionProfileManagedThroughMechanismPermit>,
    private readonly ztrackingOperatorPermissionProfileService: ZtrackingOperatorPermissionProfileService,
  ) {
    this.logger.debug(
      `${OperatorPermissionProfileService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getOperatorsForPermissionProfile(
    { permissionProfileId = '' }: GetOperatorsForPermissionProfileDto,
    traceId: string,
  ): Promise<OperatorPermissionProfileDto[]> {
    if (!permissionProfileId)
      throw new BadRequestException('permissionProfileId must be provided');

    const operators = await this.operatorPermissionProfileRepository.find({
      where: { permissionProfileId },
    });

    this.logger.info(
      `${operators?.length || 0} operators following the criteria found in database`,
      traceId,
      'getOperatorsForPermissionProfile',
      LogStreamLevel.ProdStandard,
    );

    return operators;
  }

  async getPermissionProfileForAnOperator(
    { operatorId = '' }: GetPermissionProfileForAnOperatorDto,
    traceId: string,
  ): Promise<PermissionProfileDto> {
    if (!operatorId)
      throw new BadRequestException('operatorId must be provided');

    const { permissionProfile } =
      await this.operatorPermissionProfileRepository.findOne({
        where: { operatorId },
      });

    this.logger.info(
      `permissionProfile found from OperatorPermissionProfile based upon criteria`,
      traceId,
      'getPermissionProfileForAnOperator',
      LogStreamLevel.ProdStandard,
    );

    return permissionProfile;
  }

  async isOperatorAllowedTo(
    {
      permissionProfileId = '',
      mechanismPermitId = '',
    }: IsOperatorAllowedToDto,
    traceId: string,
  ): Promise<boolean> {
    if (!permissionProfileId && !mechanismPermitId)
      throw new BadRequestException(
        'permissionProfileId and mechanismPermitId must be provided',
      );

    const operator = await this.operatorPermissionProfileRepository.findOne({
      where: { permissionProfileId },
    });

    if (!operator)
      throw new NotFoundException(
        'No Operator exist of this permissionProfileId',
      );

    this.logger.info(
      `operator found from OperatorPermissionProfile based upon criteria`,
      traceId,
      'isOperatorAllowedTo',
      LogStreamLevel.ProdStandard,
    );
    const { isPermitted } =
      await this.permissionProfileManagedThroughMechanismPermitRepository.findOne(
        { where: { permissionProfileId } },
      );
    return isPermitted;
  }

  async addOperatorPermissionProfile(
    createPermissionProfileForAnOperatorDto: CreatePermissionProfileForAnOperatorDto,
    traceId: string, // Assuming you have a traceId for logging
  ): Promise<OperatorPermissionProfileDto> {
    const { operatorId = '', permissionProfileId = '' } =
      createPermissionProfileForAnOperatorDto;

    // Log the input parameters
    this.logger.info(
      `Received request to add operator permission profile for operatorId: ${operatorId} and permissionProfileId: ${permissionProfileId}`,
      traceId,
      'addOperatorPermissionProfile',
      LogStreamLevel.ProdStandard,
    );

    // Check if both operatorId and permissionProfileId are provided
    if (!permissionProfileId || !operatorId)
      throw new BadRequestException(
        'You must provide both permissionProfileId and operatorId',
      );

    // Construct where condition for finding the operatorPermission
    const where: FindOptionsWhere<OperatorPermissionProfile> = {
      operatorId,
      permissionProfileId,
    };

    // Try to find existing operatorPermissionProfile
    const operatorPermission =
      await this.operatorPermissionProfileRepository.findOne({ where });

    this.logger.info(
      `Checking if operatorPermissionProfile exists for operatorId: ${operatorId} and permissionProfileId: ${permissionProfileId}`,
      traceId,
      'addOperatorPermissionProfile',
      LogStreamLevel.ProdStandard,
    );

    let result: OperatorPermissionProfile;

    // If operatorPermission exists and is deleted, update it and return the updated value
    if (operatorPermission && operatorPermission.isDeleted) {
      this.logger.info(
        `OperatorPermissionProfile found and marked as deleted. Updating it.`,
        traceId,
        'addOperatorPermissionProfile',
        LogStreamLevel.ProdStandard,
      );

      await this.operatorPermissionProfileRepository.update(
        { permissionProfileId, operatorId },
        {
          ...createPermissionProfileForAnOperatorDto,
          isDeleted: false,
        },
      );

      this.logger.info(
        `OperatorPermissionProfile updated for operatorId: ${operatorId} and permissionProfileId: ${permissionProfileId}`,
        traceId,
        'addOperatorPermissionProfile',
        LogStreamLevel.ProdStandard,
      );

      // Fetch the updated record to store in result
      result = await this.operatorPermissionProfileRepository.findOne({
        where,
      });
    } else {
      this.logger.info(
        `No existing deleted OperatorPermissionProfile found, creating a new one.`,
        traceId,
        'addOperatorPermissionProfile',
        LogStreamLevel.ProdStandard,
      );

      // Create a new operator permission profile record
      const newOperatorPermission =
        this.operatorPermissionProfileRepository.create({
          ...createPermissionProfileForAnOperatorDto,
        });

      // Save the new record and store it in result
      result = await this.operatorPermissionProfileRepository.save(
        newOperatorPermission,
      );

      this.logger.info(
        `New OperatorPermissionProfile created for operatorId: ${operatorId} and permissionProfileId: ${permissionProfileId}`,
        traceId,
        'addOperatorPermissionProfile',
        LogStreamLevel.ProdStandard,
      );
    }
    if (
      await this.ztrackingOperatorPermissionProfileService.createZtrackingOperatorPermissionProfile(
        result,
        traceId,
      )
    )
      return result;
  }

  async removeOperatorPermissionProfile(
    removePermissionProfileForAnOperatorDto: RemovePermissionProfileForAnOperatorDto,
    traceId: string, // Assuming you have a traceId for logging
  ): Promise<OperatorPermissionProfile> {
    const { operatorId = '', permissionProfileId = '' } =
      removePermissionProfileForAnOperatorDto;

    // Log the input parameters
    this.logger.info(
      `Received request to remove operator permission profile for operatorId: ${operatorId} and permissionProfileId: ${permissionProfileId}`,
      traceId,
      'removeOperatorPermissionProfile',
      LogStreamLevel.ProdStandard,
    );

    // Check if both operatorId and permissionProfileId are provided
    if (!permissionProfileId || !operatorId)
      throw new BadRequestException(
        'You must provide both permissionProfileId and operatorId',
      );

    // Construct where condition for finding the operatorPermission
    const where: FindOptionsWhere<OperatorPermissionProfile> = {
      operatorId,
      permissionProfileId,
    };
    this.logger.info(
      `Checking if operatorPermissionProfile exists for operatorId: ${operatorId} and permissionProfileId: ${permissionProfileId}`,
      traceId,
      'removeOperatorPermissionProfile',
      LogStreamLevel.ProdStandard,
    );
    // Try to find existing operatorPermissionProfile
    let operatorPermissionProfile =
      await this.operatorPermissionProfileRepository.findOne({ where });

    if (!operatorPermissionProfile)
      throw new NotFoundException(
        'No existing deleted OperatorPermissionProfile found',
      );

    this.logger.info(
      `OperatorPermissionProfile found. Mark is as deleted.`,
      traceId,
      'addOperatorPermissionProfile',
      LogStreamLevel.ProdStandard,
    );

    await this.operatorPermissionProfileRepository.update(
      { permissionProfileId, operatorId },
      {
        isDeleted: true,
      },
    );

    this.logger.info(
      `OperatorPermissionProfile updated for operatorId: ${operatorId} and permissionProfileId: ${permissionProfileId}`,
      traceId,
      'addOperatorPermissionProfile',
      LogStreamLevel.ProdStandard,
    );

    // Fetch the updated record to store in result
    operatorPermissionProfile =
      await this.operatorPermissionProfileRepository.findOne({
        where,
      });

    if (
      await this.ztrackingOperatorPermissionProfileService.createZtrackingOperatorPermissionProfile(
        operatorPermissionProfile,
        traceId,
      )
    )
      return operatorPermissionProfile;
  }
}
