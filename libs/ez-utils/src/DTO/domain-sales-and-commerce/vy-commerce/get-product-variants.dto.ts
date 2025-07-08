import { PickType } from '@nestjs/swagger';
import { ProductVariantDto } from './product-variant.dto';

export class GetProductVariantsDto extends PickType(ProductVariantDto, ['productId'] as const) {}
