import { ApiProperty } from '@nestjs/swagger';
import { FlipConfig } from './flip-config.dto';
import { FlipResponse } from './flip-response.dto';

export class StartFlipResponse {
  @ApiProperty()
  sessionId: string;

  @ApiProperty()
  serverSeedHash: string;

  @ApiProperty({ type: () => FlipConfig })
  config: FlipConfig;

  @ApiProperty({ type: () => FlipResponse })
  firstFlip: FlipResponse;
}
