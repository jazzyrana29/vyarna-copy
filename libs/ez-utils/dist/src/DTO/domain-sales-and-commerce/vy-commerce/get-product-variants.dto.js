"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductVariantsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const product_variant_dto_1 = require("./product-variant.dto");
class GetProductVariantsDto extends (0, swagger_1.PickType)(product_variant_dto_1.ProductVariantDto, ['productId']) {
}
exports.GetProductVariantsDto = GetProductVariantsDto;
//# sourceMappingURL=get-product-variants.dto.js.map