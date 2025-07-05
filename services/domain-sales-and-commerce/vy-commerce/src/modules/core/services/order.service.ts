import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../../entities/order.entity';
import { ZtrackingOrderService } from './ztracking-order.service';
import {
  CreateOrderDto,
  OrderDto,
  GetOrdersDto,
  GetZtrackingOrderDto,
  ZtrackingOrderDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class OrderService {
  private logger = getLoggerConfig(OrderService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly ztrackingOrderService: ZtrackingOrderService,
  ) {
    this.logger.debug(
      `${OrderService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createOrder(
    createDto: CreateOrderDto,
    traceId: string,
  ): Promise<OrderDto> {
    const entity = this.orderRepo.create(createDto);
    await this.orderRepo.save(entity);
    this.logger.info(
      'Order created',
      traceId,
      'createOrder',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingOrderService.createZtrackingForOrder(entity, traceId);

    return entity;
  }

  async getOrders(
    _getDto: GetOrdersDto,
    traceId: string,
  ): Promise<OrderDto[]> {
    const list = await this.orderRepo.find();
    this.logger.info(
      `Retrieved ${list.length} orders`,
      traceId,
      'getOrders',
      LogStreamLevel.DebugLight,
    );
    return list;
  }

  async getZtrackingOrder(
    getDto: GetZtrackingOrderDto,
    traceId: string,
  ): Promise<ZtrackingOrderDto[]> {
    return this.ztrackingOrderService.getZtrackingForOrder(getDto, traceId);
  }
}
