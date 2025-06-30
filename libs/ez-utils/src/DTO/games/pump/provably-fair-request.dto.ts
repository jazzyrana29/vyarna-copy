import { IsUUID } from "class-validator";

export class PumpProvablyFairRequestDto {
  @IsUUID()
  gameId: string;
}
