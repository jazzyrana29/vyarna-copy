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
exports.OperatorSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const device_session_id_dto_1 = require("../../../shared-dtos/operators/device-session-id.dto");
const operator_id_dto_1 = require("../../../shared-dtos/operators/operator-id.dto");
class OperatorSessionDto {
}
exports.OperatorSessionDto = OperatorSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the operator session",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OperatorSessionDto.prototype, "operatorSessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The device session associated with this operator session",
        type: () => device_session_id_dto_1.DeviceSessionIdDto,
        required: true,
    }),
    (0, class_transformer_1.Type)(() => device_session_id_dto_1.DeviceSessionIdDto),
    __metadata("design:type", Object)
], OperatorSessionDto.prototype, "deviceSession", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The operator associated with this session",
        type: () => operator_id_dto_1.OperatorIdDto,
        required: true,
    }),
    (0, class_transformer_1.Type)(() => operator_id_dto_1.OperatorIdDto),
    __metadata("design:type", Object)
], OperatorSessionDto.prototype, "operator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user who last updated this session",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OperatorSessionDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The creation time of the operator session",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], OperatorSessionDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The last update time of the operator session",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], OperatorSessionDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The login time of the operator",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], OperatorSessionDto.prototype, "loginTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The logout time of the operator, if applicable",
        type: Date,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], OperatorSessionDto.prototype, "logoutTime", void 0);
//# sourceMappingURL=operator-session.dto.js.map