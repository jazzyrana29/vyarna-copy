import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";

export enum CrashVariant {
  classic = "classic",
  turbo = "turbo",
}

export class StartCrashDto {
  @ApiProperty({ example: 0.1 })
  @IsNumber()
  wager: number;

  @ApiProperty({ example: 2.5 })
  @IsNumber()
  cashoutAt: number;

  @ApiProperty({ example: "client-seed" })
  @IsString()
  clientSeed: string;

  @ApiProperty({ enum: CrashVariant, default: CrashVariant.classic })
  @IsEnum(CrashVariant)
  variant: CrashVariant;
}
