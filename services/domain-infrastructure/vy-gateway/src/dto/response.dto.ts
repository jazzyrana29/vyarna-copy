import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO<T> {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  data: T;
  @ApiProperty()
  message: string;
  @ApiProperty({ required: false })
  traceId?: string;
  constructor(status: HttpStatus, data: T, message: string, traceId?: string) {
    this.statusCode = status;
    this.data = data;
    this.message = message;
    if (traceId) this.traceId = traceId;
  }
}
