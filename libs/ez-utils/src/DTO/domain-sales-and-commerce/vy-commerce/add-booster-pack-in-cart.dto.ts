import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class AddBoosterPackInCartDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  personId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  cartId?: string;
}
