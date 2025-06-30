import { IsOptional, IsUUID } from 'class-validator';

export class CrashConfigRequestDto {
  @IsOptional()
  @IsUUID()
  gameId?: string;
}
