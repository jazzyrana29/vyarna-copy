import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { Order } from '../../../entities/order.entity';
import { ZtrackingOrder } from '../../../entities/ztracking_order.entity';
import { GetZtrackingOrderDto, ZtrackingOrderDto } from 'ez-utils';

@Injectable()
export class ZtrackingOrderService {
  private logger = getLoggerConfig(ZtrackingOrderService.name);

  constructor(
    @InjectRepository(ZtrackingOrder)
    private readonly ztrackingRepo: Repository<ZtrackingOrder>,
  ) {
    this.logger.debug(
      `${ZtrackingOrderService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForOrder(
    order: Order,
    traceId: string,
  ): Promise<ZtrackingOrder> {
    const entity = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...order, versionDate: new Date() }),
    );

    this.logger.info(
      `ztracking order saved in database`,
      traceId,
      'createZtrackingForOrder',
      LogStreamLevel.ProdStandard,
    );
    return entity;
  }

  async getZtrackingForOrder(
    getZtrackingForOrderDto: GetZtrackingOrderDto,
    traceId: string,
  ): Promise<ZtrackingOrderDto[]> {
    const { orderId = '' } = getZtrackingForOrderDto;
    const entities = await this.ztrackingRepo.find({ where: { orderId } });

    if (!entities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${orderId}`,
        traceId,
        'getZtrackingForOrder',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${orderId}`,
      );
    }

    this.logger.info(
      `${entities.length} ztracking order found in database`,
      traceId,
      'getZtrackingForOrder',
      LogStreamLevel.ProdStandard,
    );
    //@ts-ignore
    return entities;
  }
}
