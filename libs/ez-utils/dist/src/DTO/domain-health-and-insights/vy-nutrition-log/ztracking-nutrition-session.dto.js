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
exports.ZtrackingNutritionSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingNutritionSessionDto {
}
exports.ZtrackingNutritionSessionDto = ZtrackingNutritionSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ztracking version identifier', required: true }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingNutritionSessionDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Session identifier', required: true }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingNutritionSessionDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Milk giver identifier', required: true }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingNutritionSessionDto.prototype, "milkGiverId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Baby identifier', required: true }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingNutritionSessionDto.prototype, "babyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Session type' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZtrackingNutritionSessionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Session status' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZtrackingNutritionSessionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Start time', type: String, format: 'date-time' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingNutritionSessionDto.prototype, "startedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'End time', required: false, type: String, format: 'date-time' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingNutritionSessionDto.prototype, "endedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation time', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingNutritionSessionDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Update time', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingNutritionSessionDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Version date', required: true }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingNutritionSessionDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-nutrition-session.dto.js.map