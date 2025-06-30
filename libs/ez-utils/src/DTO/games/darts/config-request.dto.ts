import { IsOptional, IsUUID } from 'class-validator';

export class DartsConfigRequestDto {
  @IsOptional()
  @IsUUID()
  gameId?: string;
}
