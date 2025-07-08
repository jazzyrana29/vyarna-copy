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
exports.SubscriptionEventDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SubscriptionEventDto {
}
exports.SubscriptionEventDto = SubscriptionEventDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier", format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubscriptionEventDto.prototype, "eventId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Subscription id", format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SubscriptionEventDto.prototype, "subscriptionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Event type",
        enum: ["RENEWAL", "PAYMENT_FAILED", "CANCELLATION"],
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubscriptionEventDto.prototype, "eventType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Event time", type: String, format: "date-time" }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SubscriptionEventDto.prototype, "eventTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Payload data" }),
    __metadata("design:type", Object)
], SubscriptionEventDto.prototype, "payload", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Creation timestamp", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SubscriptionEventDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Last update timestamp", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SubscriptionEventDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=subscription-event.dto.js.map