import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum AutoBetStrategy {
  MANUAL = 'manual',
  MARTINGALE = 'martingale',
  PAROLI = 'paroli',
  DALEM = 'dalem',
  DELAYED_MARTINGALE = 'delayed-martingale',
}

export class AutoBetSettingsDto {
  @ApiProperty()
  @IsNumber()
  initialBet: number;

  @ApiProperty()
  @IsNumber()
  totalRolls: number;

  @ApiProperty()
  @IsNumber()
  onWinPct: number;

  @ApiProperty()
  @IsNumber()
  onLossPct: number;

  @ApiProperty()
  @IsNumber()
  stopOnProfit: number;

  @ApiProperty()
  @IsNumber()
  stopOnLoss: number;

  @ApiProperty()
  @IsNumber()
  target: number;

  @ApiProperty()
  @IsBoolean()
  rollOver: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  martingale?: boolean;

  @ApiProperty({ enum: AutoBetStrategy, required: false, default: AutoBetStrategy.MANUAL })
  @IsOptional()
  @IsEnum(AutoBetStrategy)
  strategy?: AutoBetStrategy;
}
