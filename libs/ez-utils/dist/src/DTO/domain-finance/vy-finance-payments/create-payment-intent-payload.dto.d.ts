import { ItemDto } from './item.dto';
import { CustomerDetailsDto } from './customer-details.dto';
export declare class CreatePaymentIntentPayloadDto {
    items: ItemDto[];
    customerDetails: CustomerDetailsDto;
    idempotencyKey?: string;
}
