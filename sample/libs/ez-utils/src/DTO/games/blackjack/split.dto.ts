import { IsUUID } from "class-validator";

export class BlackjackSplitDto {
  @IsUUID()
  gameId: string;
}
