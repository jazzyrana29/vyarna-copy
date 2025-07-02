import { IsOptional, IsUUID } from "class-validator";

export class MinesConfigRequestDto {
  @IsOptional()
  @IsUUID()
  gameId?: string;
}
