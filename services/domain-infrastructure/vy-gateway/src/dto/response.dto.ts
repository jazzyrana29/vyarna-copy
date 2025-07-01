import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO<T> {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  data: T;
  @ApiProperty()
  message: string;

  constructor(status: HttpStatus, data: T, message: string) {
    this.statusCode = status;
    this.data = data;
    this.message = message;
  }
}
