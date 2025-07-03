import { Controller, Body, Post, Get, Query } from '@nestjs/common';
import { GrowthMeasurementService } from './services/growth-measurement.service';

@Controller('development')
export class DevelopmentController {
  constructor(private readonly service: GrowthMeasurementService) {}

  @Post('growth')
  async create(@Body() body: any): Promise<any> {
    const traceId = body.traceId || '';
    const created = await this.service.create(body, traceId);
    return { growthId: created.growthId };
  }

  @Get('growth')
  async list(@Query('babyId') babyId: string): Promise<any[]> {
    return this.service.getAll(babyId);
  }
}
