import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsBoolean } from 'class-validator';

export class GetProductsDto {
  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
