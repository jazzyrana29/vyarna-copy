import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export enum DartsDifficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
  Expert = "expert",
}

export class StartDartsGameDto {
  @IsNumber()
  bet: number;

  @IsEnum(DartsDifficulty)
  difficulty: DartsDifficulty;

  @IsOptional()
  @IsString()
  clientSeed?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
