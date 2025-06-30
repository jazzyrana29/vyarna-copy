import { IsNumber, IsString, IsEnum } from 'class-validator';
import { DartsDifficulty } from './start-darts-game.dto';

export class StartDartsGameResponseDto {
  @IsString()
  gameId: string;

  @IsNumber()
  bet: number;

  @IsEnum(DartsDifficulty)
  difficulty: DartsDifficulty;

  @IsString()
  clientSeed: string;

  @IsString()
  serverSeedHash: string;
}
