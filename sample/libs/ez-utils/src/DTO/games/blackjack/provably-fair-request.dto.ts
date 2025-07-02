import { IsUUID } from "class-validator";

export class BlackjackProvablyFairRequestDto {
  @IsUUID()
  gameId: string;
}
