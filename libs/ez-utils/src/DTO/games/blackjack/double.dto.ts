import { IsUUID } from 'class-validator';

export class BlackjackDoubleDto {
  @IsUUID()
  gameId: string;
}
