import { IsUUID } from 'class-validator';

export class DartsProvablyFairRequestDto {
  @IsUUID()
  gameId: string;
}
