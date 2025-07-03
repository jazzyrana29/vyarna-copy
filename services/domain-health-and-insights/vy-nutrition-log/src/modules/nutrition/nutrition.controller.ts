import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { NutritionSessionService } from './services/nutrition-session.service';

@Controller('nutrition')
export class NutritionController {
  constructor(private readonly service: NutritionSessionService) {}

  @Post('sessions')
  async start(@Body() body: any): Promise<any> {
    const traceId = body.traceId || '';
    const session = await this.service.startSession(body, traceId);
    return { sessionId: session.sessionId };
  }

  @Get('sessions/:id')
  async get(@Param('id') id: string): Promise<any> {
    return this.service.getSession(id);
  }
}
