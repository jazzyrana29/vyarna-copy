import { IsUUID } from "class-validator";

export class BlackjackStandDto {
  @IsUUID()
  gameId: string;
}
