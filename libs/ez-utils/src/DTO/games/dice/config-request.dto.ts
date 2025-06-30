import { IsOptional, IsUUID } from 'class-validator';

export class DiceConfigRequestDto {
  @IsOptional()
  @IsUUID()
  gameId?: string;
}
