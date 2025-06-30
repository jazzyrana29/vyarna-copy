import { IsUUID } from 'class-validator';

export class BlackjackHitDto {
  @IsUUID()
  gameId: string;
}
