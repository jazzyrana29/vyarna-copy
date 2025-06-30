import { IsUUID } from 'class-validator';

export class CrashProvablyFairRequestDto {
  @IsUUID()
  gameId: string;
}
