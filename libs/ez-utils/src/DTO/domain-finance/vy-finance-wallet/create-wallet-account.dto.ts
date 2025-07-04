import { PickType } from '@nestjs/swagger';
import { WalletAccountDto } from './wallet-account.dto';

export class CreateWalletAccountDto extends PickType(WalletAccountDto, [
  'personId',
  'type',
  'currency',
  'balanceCents',
] as const) {}
