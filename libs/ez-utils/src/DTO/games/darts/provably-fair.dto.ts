import { IsString, IsArray } from 'class-validator';

export class DartsProvablyFairDto {
  @IsString()
  serverSeedHash: string;

  @IsString()
  serverSeed: string;

  @IsString()
  clientSeed: string;

  @IsArray()
  @IsString({ each: true })
  nonceMap: string[];
}
