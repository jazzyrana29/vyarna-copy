import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FlipProvablyFairRequestDto {
  @ApiProperty()
  @IsString()
  sessionId: string;
}
