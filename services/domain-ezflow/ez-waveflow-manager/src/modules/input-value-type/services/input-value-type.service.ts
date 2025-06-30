import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { InputValueType } from '../../../entities/input-value-type.entity';

import {
  GetInputValueTypeDto,
  GetManyInputValueTypesDto,
  InputValueTypeDto,
} from 'ez-utils';

@Injectable()
export class InputValueTypeService {
  private logger = getLoggerConfig(InputValueTypeService.name);

  constructor(
    @InjectRepository(InputValueType)
    private readonly inputValueTypeRepository: Repository<InputValueType>,
  ) {
    this.logger.debug(
      `${InputValueTypeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async findInputValueTypeService(
    getInputValueTypeDto: GetInputValueTypeDto,
    traceId: string,
  ): Promise<InputValueTypeDto> {
    const { inputValueTypeId, name } = getInputValueTypeDto;
    if (!inputValueTypeId && !name) {
      this.logger.error(
        'At least one parameter (inputValueTypeId or name) must be provided',
        traceId,
        'findInputValueTypeService',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        'At least one parameter (inputValueTypeId or name) must be provided',
      );
    }

    const where = {};
    if (inputValueTypeId) where['inputValueTypeId'] = inputValueTypeId;
    if (name) where['name'] = name;
    where['isDeleted'] = false;

    this.logger.debug(
      `Conditions Filters for search: ${JSON.stringify(where)}`,
      traceId,
      'findInputValueTypeService',
      LogStreamLevel.ProdStandard,
    );

    const inputValueType = await this.inputValueTypeRepository.findOne({
      where,
    });

    if (!inputValueType) {
      this.logger.error(
        `No input value type found with the provided criteria`,
        traceId,
        'findInputValueTypeService',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No input value type found with the provided criteria`,
      );
    }

    this.logger.info(
      `Input value type found in database`,
      traceId,
      'findInputValueTypeService',
      LogStreamLevel.ProdStandard,
    );

    return inputValueType;
  }

  async getManyInputValueTypeService(
    getManyInputValueTypesDto: GetManyInputValueTypesDto,
    traceId: string,
  ): Promise<InputValueTypeDto[]> {
    const { name } = getManyInputValueTypesDto;
    const where = {};
    if (name) where['name'] = name;
    where['isDeleted'] = false;

    this.logger.debug(
      `Conditions Filters for search: ${JSON.stringify(where)}`,
      traceId,
      'getManyInputValueTypeService',
      LogStreamLevel.ProdStandard,
    );

    const inputValueTypes = await this.inputValueTypeRepository.find({
      where,
    });

    this.logger.info(
      `Input value type found by matching criteria`,
      traceId,
      'getManyInputValueTypeService',
      LogStreamLevel.ProdStandard,
    );

    return inputValueTypes;
  }
}
