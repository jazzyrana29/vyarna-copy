import { IsUUID } from 'class-validator';

export class SnakesProvablyFairRequestDto {
  @IsUUID()
  roundId: string;
}
