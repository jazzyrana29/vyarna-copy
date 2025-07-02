import { IsBoolean, IsInt, IsNumber } from "class-validator";

export class RollDiceResponseDto {
  @IsInt()
  dice1: number;

  @IsInt()
  dice2: number;

  @IsInt()
  newPosition: number;

  @IsBoolean()
  isSnake: boolean;

  @IsNumber()
  stepMultiplier: number;

  @IsNumber()
  currentMultiplier: number;

  @IsBoolean()
  gameOver: boolean;
}
