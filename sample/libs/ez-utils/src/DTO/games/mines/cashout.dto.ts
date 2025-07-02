import { IsUUID } from "class-validator";

export class MinesCashoutDto {
  @IsUUID()
  gameId: string;
}
