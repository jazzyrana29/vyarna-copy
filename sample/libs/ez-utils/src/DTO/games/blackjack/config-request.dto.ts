import { IsOptional, IsUUID } from "class-validator";

export class BlackjackConfigRequestDto {
  @IsOptional()
  @IsUUID()
  gameId?: string;
}
