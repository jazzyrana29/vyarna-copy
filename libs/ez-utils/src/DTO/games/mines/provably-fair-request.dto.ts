import { IsUUID } from "class-validator";

export class MinesProvablyFairRequestDto {
  @IsUUID()
  gameId: string;
}
