import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class DocumentInputDto {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  url: string;
}

export class StartIdentityVerificationDto {
  @ApiProperty()
  @IsUUID()
  personId: string;

  @ApiProperty({ type: [DocumentInputDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentInputDto)
  documents: DocumentInputDto[];
}
