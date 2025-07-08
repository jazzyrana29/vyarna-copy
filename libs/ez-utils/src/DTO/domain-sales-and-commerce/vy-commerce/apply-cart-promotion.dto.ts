import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';

export class ApplyCartPromotionDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  cartId: string;

  @ApiProperty()
  @IsString()
  code: string;
}
