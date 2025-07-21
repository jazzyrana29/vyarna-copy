import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhysicalAddress } from '../../entities/physical-address.entity';
import {
  CreatePhysicalAddressDto,
  UpdatePhysicalAddressDto,
  GetOnePersonDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class PhysicalAddressService {
  private logger = getLoggerConfig(PhysicalAddressService.name);

  constructor(
    @InjectRepository(PhysicalAddress)
    private readonly addressRepo: Repository<PhysicalAddress>,
  ) {
    this.logger.debug(
      `${PhysicalAddressService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createAddress(
    dto: CreatePhysicalAddressDto,
    traceId: string,
  ): Promise<PhysicalAddress> {
    const existing = await this.addressRepo.find({
      where: { personId: dto.personId },
    });
    if (!existing.length) {
      dto.isPrimary = true;
    }
    if (dto.isPrimary) {
      await this.addressRepo.update(
        { personId: dto.personId },
        { isPrimary: false },
      );
    }
    const entity = await this.addressRepo.save(this.addressRepo.create(dto));
    this.logger.info(
      'Physical address created',
      traceId,
      'createAddress',
      LogStreamLevel.ProdStandard,
    );
    return entity;
  }

  async updateAddress(
    dto: UpdatePhysicalAddressDto,
    traceId: string,
  ): Promise<PhysicalAddress> {
    const entity = await this.addressRepo.findOne({
      where: { addressId: dto.addressId },
    });
    if (!entity) {
      throw new NotFoundException(`address ${dto.addressId} not found`);
    }
    if (dto.isPrimary) {
      await this.addressRepo.update(
        { personId: entity.personId },
        { isPrimary: false },
      );
    }
    await this.addressRepo.update(dto.addressId, dto);
    const updated = await this.addressRepo.findOne({
      where: { addressId: dto.addressId },
    });
    this.logger.info(
      'Physical address updated',
      traceId,
      'updateAddress',
      LogStreamLevel.ProdStandard,
    );
    return updated!;
  }

  async getAddresses(
    dto: GetOnePersonDto,
    traceId: string,
  ): Promise<PhysicalAddress[]> {
    const addresses = await this.addressRepo.find({
      where: { personId: dto.personId },
      order: { isPrimary: 'DESC', createdAt: 'ASC' },
    });
    this.logger.info(
      'Addresses retrieved',
      traceId,
      'getAddresses',
      LogStreamLevel.ProdStandard,
    );
    return addresses;
  }
}
