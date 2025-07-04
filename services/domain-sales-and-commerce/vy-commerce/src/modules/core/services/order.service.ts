import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../../entities/order.entity';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class OrderService {
  private logger = getLoggerConfig(OrderService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {
    this.logger.debug(
      `${OrderService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async create(order: Partial<Order>, traceId: string): Promise<Order> {
    const entity = this.orderRepo.create(order);
    await this.orderRepo.save(entity);
    this.logger.info('Order created', traceId, 'create', LogStreamLevel.ProdStandard);
    return entity;
  }

  async findAll(traceId: string): Promise<Order[]> {
    const list = await this.orderRepo.find();
    this.logger.info(`Retrieved ${list.length} orders`, traceId, 'findAll', LogStreamLevel.DebugLight);
    return list;
  }
}
