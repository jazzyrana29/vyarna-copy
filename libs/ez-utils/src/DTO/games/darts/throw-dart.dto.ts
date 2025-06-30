import { IsUUID } from 'class-validator';

export class ThrowDartDto {
  @IsUUID()
  gameId: string;
}
