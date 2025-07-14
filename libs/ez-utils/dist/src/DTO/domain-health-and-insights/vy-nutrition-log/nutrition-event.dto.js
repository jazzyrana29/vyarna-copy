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
exports.NutritionEventDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class NutritionEventDto {
}
exports.NutritionEventDto = NutritionEventDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Session identifier' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NutritionEventDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type of nutrition event' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NutritionEventDto.prototype, "eventType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Event payload', required: false, type: 'object' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], NutritionEventDto.prototype, "payload", void 0);
//# sourceMappingURL=nutrition-event.dto.js.map