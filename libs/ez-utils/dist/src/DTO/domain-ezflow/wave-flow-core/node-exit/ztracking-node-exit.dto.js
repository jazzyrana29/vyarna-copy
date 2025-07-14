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
exports.ZtrackingNodeExitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingNodeExitDto {
}
exports.ZtrackingNodeExitDto = ZtrackingNodeExitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The unique identifier of the Ztracking node exit version",
        type: String,
        format: "uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingNodeExitDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The identifier for the node exit",
        type: String,
        format: "uuid",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingNodeExitDto.prototype, "nodeExitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The ID of the associated node exit type",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingNodeExitDto.prototype, "nodeExitTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The ID of the source node from which this exit originates",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingNodeExitDto.prototype, "sourceNodeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The ID of the target node to which this exit leads (if any)",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingNodeExitDto.prototype, "targetNodeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The ID of the associated filter",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingNodeExitDto.prototype, "filterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the Ztracking node exit is marked as deleted",
        type: Boolean,
        default: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZtrackingNodeExitDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user who last updated this Ztracking node exit",
        type: String,
        format: "uuid",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingNodeExitDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the Ztracking node exit version was created",
        type: Date,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingNodeExitDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-node-exit.dto.js.map