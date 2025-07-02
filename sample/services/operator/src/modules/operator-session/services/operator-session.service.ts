import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { Operator } from '../../../entities/operator.entity';
import { OperatorSession } from '../../../entities/operator-session.entity';

import { ZtrackingOperatorSessionService } from './ztracking-operator-session.service';
import { LogStreamLevel } from 'ez-logger';

import { getLoggerConfig } from '../../../utils/common';
import {
  CreateOperatorSessionDto,
  GetOperatorSessionDto,
  LoginOperatorSessionDto,
  LogoutOperatorSessionDto,
  OperatorSessionDto,
  SearchOperatorSessionsDto,
  UpdateOperatorSessionDto,
} from 'ez-utils';

@Injectable()
export class OperatorSessionService {
  private logger = getLoggerConfig(OperatorSessionService.name);

  constructor(
    @InjectRepository(OperatorSession)
    private readonly operatorSessionRepository: Repository<OperatorSession>,
    @InjectRepository(Operator)
    private readonly operatorRepository: Repository<Operator>,
    private readonly ztrackingOperatorSessionService: ZtrackingOperatorSessionService,
  ) {
    this.logger.debug(
      `${OperatorSessionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createOperatorSession(
    createOperatorSessionDto: CreateOperatorSessionDto,
    traceId: string,
  ): Promise<any> {
    this.logger.log(
      `createOperatorSessionDto : ${JSON.stringify(createOperatorSessionDto)}`,
      traceId,
      'createOperatorSession',
      LogStreamLevel.ProdStandard,
    );
    const operatorSession = await this.operatorSessionRepository.save(
      this.operatorSessionRepository.create(createOperatorSessionDto),
    );

    this.logger.info(
      `operator session entity saved in database`,
      traceId,
      'createOperatorSession',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingOperatorSessionService.createZtrackingOperatorSessionEntity(
        operatorSession,
        traceId,
      )
    )
      return operatorSession;
  }

  async updateOperatorSession(
    updateOperatorSessionDto: UpdateOperatorSessionDto,
    traceId: string,
  ): Promise<any> {
    const operatorSession = await this.operatorSessionRepository.findOne({
      where: { operatorSessionId: updateOperatorSessionDto.operatorSessionId },
    });

    if (!operatorSession) {
      throw new NotFoundException(
        `No operator session existed with this id => ${updateOperatorSessionDto.operatorSessionId}`,
      );
    }
    const updatedOperatorSession = await this.operatorSessionRepository.save(
      updateOperatorSessionDto,
    );

    this.logger.info(
      `operator session entity updated in database`,
      traceId,
      'updateOperatorSession',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingOperatorSessionService.createZtrackingOperatorSessionEntity(
        updatedOperatorSession,
        traceId,
      )
    )
      return updatedOperatorSession;
  }

  async findOperatorSession(
    findOperatorSessionDto: GetOperatorSessionDto,
    traceId: string,
  ): Promise<OperatorSession> {
    const { operatorSessionId } = findOperatorSessionDto;
    if (!operatorSessionId)
      throw new BadRequestException(
        'At least one parameter (sessionId or operatorId) must be provided',
      );
    // TODO: add this everywhere so we don't get unnecessary keys instead of any
    const where: FindOptionsWhere<OperatorSession> = {};

    if (operatorSessionId) where.operatorSessionId = operatorSessionId;

    this.logger.debug(
      `Conditions Filters for search : ${JSON.stringify(where)}`,
      traceId,
      'findOperatorSession',
      LogStreamLevel.ProdStandard,
    );
    const operatorSession = await this.operatorSessionRepository.findOne({
      where,
      relations: ['operator', 'deviceSession'],
    });

    if (!operatorSession)
      throw new NotFoundException(
        `No operator session found with the provided criteria`,
      );

    this.logger.info(
      `Operator session entity found in database`,
      traceId,
      'findOperatorSession',
      LogStreamLevel.ProdStandard,
    );

    return operatorSession;
  }

  async loginOperator(
    { username = '', password = '' }: LoginOperatorSessionDto,
    traceId: string,
  ): Promise<OperatorSessionDto> {
    if (!username && !password)
      throw new BadRequestException('Ypu must provide username and password');

    const where: FindOptionsWhere<Operator> = {};
    if (username) where.username = username;

    const operator = await this.operatorRepository.findOne({
      where: { username: username },
    });

    if (!operator) throw new UnauthorizedException(`username not found`);

    const isPasswordValid = await bcrypt.compare(password, operator.password);

    if (!isPasswordValid)
      throw new UnauthorizedException(`Invalid username or password`);
    this.logger.info(
      `Operator logged in successfully`,
      traceId,
      'loginOperator',
      LogStreamLevel.ProdStandard,
    );
    return await this.operatorSessionRepository.save({
      operator,
      loginTime: new Date(),
    });
  }

  async logoutOperatorSession(
    { operatorSessionId }: LogoutOperatorSessionDto,
    traceId: string,
  ): Promise<any> {
    if (!operatorSessionId)
      throw new BadRequestException('Ypu must provide operatorSessionId');
    const where: FindOptionsWhere<OperatorSession> = {};
    where.operatorSessionId = operatorSessionId;
    const operatorSession = await this.operatorSessionRepository.findOne({
      where,
      relations: ['operator', 'deviceSession'],
    });

    if (!operatorSession)
      throw new NotFoundException(
        `No operator session existed with operatorSessionId => ${operatorSessionId}`,
      );

    operatorSession.logoutTime = new Date();
    const updatedOperatorSession =
      await this.operatorSessionRepository.save(operatorSession);

    this.logger.info(
      `Operator session entity updated with logoutTime in database`,
      traceId,
      'logoutOperatorSession',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingOperatorSessionService.createZtrackingOperatorSessionEntity(
      updatedOperatorSession,
      traceId,
    );

    return updatedOperatorSession;
  }

  async searchOperatorSessions(
    searchOperatorSessionsDto: SearchOperatorSessionsDto,
    traceId: string,
  ): Promise<OperatorSession[]> {
    const { operatorId, startDate, endDate } = searchOperatorSessionsDto;

    const searchCriteria: any = {};

    if (operatorId) {
      searchCriteria.operator = {
        operatorId,
      };
    }

    if (startDate && endDate) {
      searchCriteria.loginTime = Between(startDate, endDate);
    }

    this.logger.debug(
      `Search criteria: ${JSON.stringify(searchCriteria)}`,
      traceId,
      'searchOperatorSessions',
      LogStreamLevel.ProdStandard,
    );

    const operatorSessions = await this.operatorSessionRepository.find({
      where: searchCriteria,
    });

    this.logger.info(
      `Operator sessions retrieved from database`,
      traceId,
      'searchOperatorSessions',
      LogStreamLevel.ProdStandard,
    );

    return operatorSessions;
  }
}
