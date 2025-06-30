import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { FilterDto } from 'ez-utils';

@Injectable()
export class FilterEvaluatorService {
  private logger = getLoggerConfig(FilterEvaluatorService.name);

  constructor() {
    this.logger.debug(
      `${FilterEvaluatorService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  /**
   * Evaluates a filter's conditions and returns true if it passes.
   */
  public async checkFilter(
    filterDto: FilterDto,
    waveContext: any,
    traceId: string,
  ): Promise<boolean> {
    if (!filterDto || filterDto.isDeleted || !filterDto.filterSubsets?.length) {
      return false;
    }

    this.logger.debug(
      `Evaluating filter: ${filterDto.filterName}`,
      traceId,
      'checkFilter',
      LogStreamLevel.DebugLight,
    );

    // Prepare grouping of subset results
    const groups: boolean[][] = [];
    let currentGroup: boolean[] = [];

    const sortedSubsets = [...filterDto.filterSubsets].sort(
      (a, b) => a.filterOrder - b.filterOrder,
    );

    for (const subset of sortedSubsets) {
      if (subset.isDeleted || !subset.filterSubsetItems?.length) continue;

      this.logger.debug(
        `Processing subset ${subset.filterSubsetId} | ` +
          `Internal binding: ${subset.filterSubsetInternalLogicalBinding}`,
        traceId,
        'checkFilter',
        LogStreamLevel.DebugLight,
      );

      const itemResults: boolean[] = subset.filterSubsetItems
        .filter((item) => !item.isDeleted)
        .map((item) =>
          this.evaluateCondition(
            item.evaluationVariable?.name ?? 'unknown',
            (item.evaluationVariable?.evaluationVariableDataType as any)
              ?.name ?? 'unknown',
            item.evaluationOperator?.symbol ?? '',
            item.evaluationValue,
            waveContext,
            traceId,
          ),
        );

      const subsetResult =
        subset.filterSubsetInternalLogicalBinding === 'AND'
          ? itemResults.every(Boolean)
          : itemResults.some(Boolean);

      currentGroup.push(subsetResult);

      if (subset.nextFilterSubsetLogicalBinding !== 'AND') {
        groups.push(currentGroup);
        currentGroup = [];
      }
    }

    if (currentGroup.length) {
      groups.push(currentGroup);
    }

    const finalResult = groups.some((group) => group.every(Boolean));

    this.logger.debug(
      `Filter '${filterDto.filterName}' result: ${finalResult}`,
      traceId,
      'checkFilter',
      LogStreamLevel.DebugLight,
    );

    return finalResult;
  }

  /**
   * Evaluates a single condition on one variable.
   */
  private evaluateCondition(
    variableName: string,
    dataType: string,
    operator: string,
    evaluationValue: string,
    waveContext: any,
    traceId: string,
  ): boolean {
    const actual = waveContext.inputVariables[variableName];

    this.logger.debug(
      `Evaluating condition for "${variableName}" (type=${dataType}): ` +
        `actual="${actual}", op="${operator}", target="${evaluationValue}"`,
      traceId,
      'evaluateCondition',
      LogStreamLevel.DebugLight,
    );

    switch (dataType) {
      case 'Numeric':
        return this.evaluateNumeric(actual, operator, evaluationValue);
      case 'Text':
        return this.evaluateText(actual, operator, evaluationValue);
      case 'List':
        return this.evaluateList(actual, operator, evaluationValue);
      case 'Coordinates':
        return this.evaluateCoordinates(actual, operator, evaluationValue);
      default:
        this.logger.warn(
          `Unknown data type "${dataType}" for variable "${variableName}"`,
          traceId,
          'evaluateCondition',
          LogStreamLevel.DebugHeavy,
        );
        return false;
    }
  }

  private evaluateNumeric(actual: any, op: string, target: string): boolean {
    const a = parseFloat(actual);
    const t = parseFloat(target);
    if (isNaN(a) || isNaN(t)) return false;
    switch (op) {
      case '<':
        return a < t;
      case '>':
        return a > t;
      case '<=':
        return a <= t;
      case '>=':
        return a >= t;
      default:
        return false;
    }
  }

  private evaluateText(actual: any, op: string, target: string): boolean {
    if (typeof actual !== 'string') return false;
    switch (op) {
      case 'CONTAINS':
        return actual.includes(target);
      case 'START_WITH':
        return actual.startsWith(target);
      case 'END_WITH':
        return actual.endsWith(target);
      case 'NOT_CONTAINS':
        return !actual.includes(target);
      case 'NOT_START':
        return !actual.startsWith(target);
      case 'NOT_END':
        return !actual.endsWith(target);
      default:
        return false;
    }
  }

  private evaluateList(
    actualValue: any,
    operator: string,
    targetValue: string,
  ): boolean {
    const actualList = String(actualValue)
      .split(',')
      .map((item) => item.trim());
    const targetItems = targetValue.split(',').map((item) => item.trim());

    switch (operator) {
      case 'CONTAINS':
        return targetItems.some((item) => actualList.includes(item));
      case 'NOT_CONTAINS':
        return targetItems.every((item) => !actualList.includes(item));
      default:
        return false;
    }
  }

  private evaluateCoordinates(
    actual: any,
    op: string,
    target: string,
  ): boolean {
    if (typeof actual !== 'string') return false;
    const [lat1, lon1] = actual.split(',').map(Number);
    const [lat2, lon2] = target.split(',').map(Number);
    const distance = this.haversine(lat1, lon1, lat2, lon2);
    switch (op) {
      case 'DISTANCE_GREATER':
        return distance > parseFloat(target);
      case 'DISTANCE_LESS':
        return distance <= parseFloat(target);
      default:
        return false;
    }
  }

  private haversine(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // km
    const dLat = this.deg(lat2 - lat1);
    const dLon = this.deg(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.deg(lat1)) *
        Math.cos(this.deg(lat2)) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private deg(deg: number): number {
    return (deg * Math.PI) / 180;
  }
}
