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
exports.DeviceSessionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DeviceSessionDto {
}
exports.DeviceSessionDto = DeviceSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique identifier for the device session",
        type: String,
        required: true,
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], DeviceSessionDto.prototype, "deviceSessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Start time of the session",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], DeviceSessionDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "End time of the session",
        type: Date,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], DeviceSessionDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "IP address used during the session",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DeviceSessionDto.prototype, "ipAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User agent of the device during the session",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DeviceSessionDto.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Last updated time of the session",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], DeviceSessionDto.prototype, "lastUpdated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the device session",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DeviceSessionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Device identifier associated with the session",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DeviceSessionDto.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Indicates if the session is marked as deleted",
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], DeviceSessionDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User who last updated the session",
        type: String,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DeviceSessionDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The date when the session record was created",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], DeviceSessionDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Last updated date of the session",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], DeviceSessionDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=device-session.dto.js.map