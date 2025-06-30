import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CashoutCrashGameDto {
  @ApiProperty({ description: 'Identifier of the crash game round' })
  @IsUUID()
  gameId: string;
}
