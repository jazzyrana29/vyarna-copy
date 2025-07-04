import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsString, IsDate } from 'class-validator';

export class ZtrackingOrderDto {
  @ApiProperty({ description: 'Unique identifier for the ztracking version', type: 'string', format: 'uuid' })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({ description: 'Identifier of the original order', type: 'string', format: 'uuid' })
  @IsUUID()
  orderId: string;

  @ApiProperty({ description: 'Person placing the order', type: 'string', format: 'uuid' })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'Total amount in cents' })
  @IsInt()
  totalCents: number;

  @ApiProperty({ description: 'Order status' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Date of this version', type: String, format: 'date-time' })
  @IsDate()
  versionDate: Date;
}
