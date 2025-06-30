import { IsString, IsNumber } from 'class-validator';

export class SnakesProvablyFairDto {
  @IsString()
  serverSeedHash: string;

  @IsString()
  serverSeed: string;

  @IsString()
  clientSeed: string;

  @IsNumber()
  nonce: number;
}
