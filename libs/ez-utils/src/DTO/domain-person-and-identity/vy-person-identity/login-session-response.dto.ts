import { ApiProperty } from '@nestjs/swagger';
import { SessionDto } from './session.dto';
import { PersonWithoutPasswordDto } from './person-without-password.dto';

export class LoginSessionResponseDto {
  @ApiProperty({ type: SessionDto })
  session: SessionDto;

  @ApiProperty({ type: PersonWithoutPasswordDto })
  person: PersonWithoutPasswordDto;
}
