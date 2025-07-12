import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JoinRoomDto {
  @ApiProperty({ description: 'Room identifier to join' })
  @IsString()
  room: string;
}
