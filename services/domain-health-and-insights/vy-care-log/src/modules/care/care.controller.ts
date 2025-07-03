import { Controller, Body, Post, Get, Query } from '@nestjs/common';
import { DiaperChangeService } from './services/diaper-change.service';

@Controller('care')
export class DiaperChangeController {
  constructor(private readonly service: DiaperChangeService) {}

  @Post('diaper-changes')
  async create(@Body() body: any): Promise<any> {
    const traceId = body.traceId || '';
    const created = await this.service.create(body, traceId);
    return { diaperChangeId: created.diaperChangeId };
  }

  @Get('diaper-changes')
  async get(@Query('babyId') babyId: string): Promise<any[]> {
    return this.service.findAll(babyId);
  }
}
