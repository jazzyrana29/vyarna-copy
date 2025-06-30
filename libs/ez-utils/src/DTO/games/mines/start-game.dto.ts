import { IsNumber, IsInt, IsOptional, IsString, IsUUID } from "class-validator";

export class MinesStartGameDto {
  @IsUUID()
  operatorId: string;

  @IsUUID()
  businessUnitId: string;

  @IsNumber()
  wager: number;

  @IsInt()
  numMines: number;

  @IsOptional()
  @IsString()
  clientSeed?: string;
}
