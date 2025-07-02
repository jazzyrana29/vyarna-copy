import { IsUUID } from "class-validator";

export class BlackjackInsuranceDto {
  @IsUUID()
  gameId: string;
}
