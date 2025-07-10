"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentIntentPayloadDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const item_dto_1 = require("./item.dto");
const customer_details_dto_1 = require("./customer-details.dto");
class CreatePaymentIntentPayloadDto {
}
exports.CreatePaymentIntentPayloadDto = CreatePaymentIntentPayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [item_dto_1.ItemDto],
        description: 'Line items user intends to purchase',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => item_dto_1.ItemDto),
    __metadata("design:type", Array)
], CreatePaymentIntentPayloadDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: customer_details_dto_1.CustomerDetailsDto,
        description: 'Customer contact & shipping/billing data',
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => customer_details_dto_1.CustomerDetailsDto),
    __metadata("design:type", customer_details_dto_1.CustomerDetailsDto)
], CreatePaymentIntentPayloadDto.prototype, "customerDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique idempotency key for retry-safe requests',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 255),
    __metadata("design:type", String)
], CreatePaymentIntentPayloadDto.prototype, "idempotencyKey", void 0);
//# sourceMappingURL=create-payment-intent-payload.dto.js.map