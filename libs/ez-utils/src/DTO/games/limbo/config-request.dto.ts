import { IsOptional, IsUUID } from "class-validator";

export class LimboConfigRequestDto {
  @IsOptional()
  @IsUUID()
  gameId?: string;
}
