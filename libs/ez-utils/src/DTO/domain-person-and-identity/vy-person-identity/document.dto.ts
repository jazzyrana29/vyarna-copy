import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDate } from 'class-validator';

export class DocumentDto {
  @ApiProperty({ description: 'Unique identifier for the document' })
  @IsUUID()
  documentId: string;

  @ApiProperty({ description: 'Associated verification id' })
  @IsUUID()
  verificationId: string;

  @ApiProperty({ description: 'Document type' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Document storage url' })
  @IsString()
  url: string;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDate()
  uploadedAt: Date;
}
