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
exports.SleepNotificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SleepNotificationDto {
}
exports.SleepNotificationDto = SleepNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier', required: true }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SleepNotificationDto.prototype, "notificationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Baby identifier', required: true }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SleepNotificationDto.prototype, "babyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Person identifier', required: true }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SleepNotificationDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sleep session identifier', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SleepNotificationDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notification channel', enum: ['PUSH', 'EMAIL', 'SMS'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SleepNotificationDto.prototype, "channel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Scheduled for', type: String, format: 'date-time' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SleepNotificationDto.prototype, "scheduledFor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sent at', type: String, format: 'date-time', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SleepNotificationDto.prototype, "sentAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status', enum: ['PENDING', 'SENT', 'FAILED'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SleepNotificationDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SleepNotificationDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SleepNotificationDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=sleep-notification.dto.js.map