import { PickType } from '@nestjs/swagger';
import { WalletAccountDto } from './wallet-account.dto';

export class GetWalletAccountDto extends PickType(WalletAccountDto, [
  'accountId',
] as const) {}
