import { Injectable, BadRequestException } from '@nestjs/common';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { InputVariableDto, WaveTypeDto } from 'ez-utils';

@Injectable()
export class FlowVariableValidatorService {
  private logger = getLoggerConfig(FlowVariableValidatorService.name);

  constructor() {
    this.logger.debug(
      `${FlowVariableValidatorService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  /**
   * Validates the inputVariables of ExecuteWaveDto against the `input`
   * array defined in WaveTypeDto.
   *
   * - Ensures every expected variable (by name) is present.
   * - Checks that each value’s type matches the schema definition.
   * - Rejects unexpected variables not defined in the schema.
   */
  public validateInputVariables(
    waveType: WaveTypeDto,
    inputVariables: InputVariableDto[],
    traceId: string,
  ): void {
    this.logger.debug(
      `Starting validation of input variables against waveType input schema`,
      traceId,
      'validateInputVariables',
      LogStreamLevel.DebugLight,
    );

    const schema = JSON.parse(waveType.inputSchema) || [];

    // If no inputs are defined in the schema, skip validation
    if (schema.length === 0) {
      this.logger.info(
        'No input variables defined on waveType, skipping validation',
        traceId,
        'validateInputVariables',
        LogStreamLevel.ProdStandard,
      );
      return;
    }

    const inputs = inputVariables || [];

    // --- Required fields and type checking ---
    for (const expected of schema) {
      const provided = inputs.find((v) => v.name === expected.name);
      if (!provided) {
        throw new BadRequestException(
          `Missing required input variable "${expected.name}"`,
        );
      }
      if (!this.isTypeCompatible(provided.value, expected.type)) {
        throw new BadRequestException(
          `Type mismatch for variable "${expected.name}". Expected ${expected.type}`,
        );
      }
    }

    // --- Disallow unexpected variables ---
    for (const provided of inputs) {
      if (!schema.some((exp) => exp.name === provided.name)) {
        throw new BadRequestException(
          `Unexpected input variable provided: "${provided.name}"`,
        );
      }
    }

    this.logger.info(
      'All input variables passed schema validation',
      traceId,
      'validateInputVariables',
      LogStreamLevel.ProdStandard,
    );
  }

  /**
   * Checks if `value` matches the declared `dataType`.
   * Supported types: Numeric, Text, List (CSV string), Coordinates (lat,lng).
   */
  private isTypeCompatible(value: any, dataType: string): boolean {
    switch (dataType) {
      case 'Numeric':
        return (
          typeof value === 'number' ||
          (typeof value === 'string' && !isNaN(Number(value)))
        );
      case 'Text':
        return typeof value === 'string';
      case 'List':
        if (typeof value !== 'string') return false;
        return value
          .split(',')
          .map((s) => s.trim())
          .every((s) => s.length > 0);
      case 'Coordinates':
        {
          if (typeof value !== 'string') return false;
          const parts = value.split(',').map((p) => parseFloat(p.trim()));
          return parts.length === 2 && parts.every((n) => !isNaN(n));
        }
      default:
        return false;
    }
  }
}
