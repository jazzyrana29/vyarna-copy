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
exports.ZtrackingOperatorSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ZtrackingOperatorSessionDto {
}
exports.ZtrackingOperatorSessionDto = ZtrackingOperatorSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the device session",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingOperatorSessionDto.prototype, "deviceSessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the operator",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingOperatorSessionDto.prototype, "operatorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user who last updated this session",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ZtrackingOperatorSessionDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The creation time of the operator session",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingOperatorSessionDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The login time of the operator",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingOperatorSessionDto.prototype, "loginTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The logout time of the operator, if applicable",
        type: Date,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingOperatorSessionDto.prototype, "logoutTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the operator session",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingOperatorSessionDto.prototype, "operatorSessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Version identifier for the ztracking session",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZtrackingOperatorSessionDto.prototype, "ztrackingVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The version date of the session",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ZtrackingOperatorSessionDto.prototype, "versionDate", void 0);
//# sourceMappingURL=ztracking-operator-session.dto.js.map