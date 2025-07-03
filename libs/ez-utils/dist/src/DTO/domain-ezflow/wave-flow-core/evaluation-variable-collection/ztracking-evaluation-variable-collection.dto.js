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
exports.ZtrackingEvaluationVariableCollectionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingEvaluationVariableCollectionDto {
}
exports.ZtrackingEvaluationVariableCollectionDto = ZtrackingEvaluationVariableCollectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique version identifier for the ztracking evaluation variable collection",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariableCollectionDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the evaluation variable collection",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariableCollectionDto.prototype, "evaluationVariableCollectionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the evaluation variable collection",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariableCollectionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the evaluation variable collection",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariableCollectionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifier of the user who updated the record",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZtrackingEvaluationVariableCollectionDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Creation time of the evaluation variable collection",
        type: Date,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingEvaluationVariableCollectionDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Last update time of the evaluation variable collection",
        type: Date,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingEvaluationVariableCollectionDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates whether the evaluation variable collection is deleted",
        type: Boolean,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZtrackingEvaluationVariableCollectionDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The version date of the evaluation variable collection",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingEvaluationVariableCollectionDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-evaluation-variable-collection.dto.js.map