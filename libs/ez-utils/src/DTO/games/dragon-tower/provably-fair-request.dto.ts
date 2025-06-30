import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DragonTowerProvablyFairRequestDto {
  @ApiProperty()
  @IsUUID()
  gameId: string;
}
