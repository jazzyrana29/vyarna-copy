import { IsUUID } from "class-validator";

export class CashoutDartsGameDto {
  @IsUUID()
  gameId: string;
}
