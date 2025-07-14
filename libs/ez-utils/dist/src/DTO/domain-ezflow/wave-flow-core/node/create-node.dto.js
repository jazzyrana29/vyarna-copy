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
exports.CreateNodeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const node_dto_1 = require("./node.dto");
const class_validator_1 = require("class-validator");
class CreateNodeDto extends (0, swagger_1.PickType)(node_dto_1.NodeDto, [
    "flowId",
    "nodeTypeId",
    "name",
    "positionX",
    "positionY",
    "updatedBy",
]) {
}
exports.CreateNodeDto = CreateNodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of the action (e.g. "SendEmail", "SendSMS", etc.)',
        type: String,
        required: false,
        example: "SendEmail",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "actionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Payload for the action, JSON object with actionVariables keys/values",
        type: Object,
        required: false,
        example: {
            description: "Greeting e-mail to user",
            email: "{{userEmail}}",
            body: "Hello, this is a message.",
            subject: "Greetings",
        },
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateNodeDto.prototype, "actionPayload", void 0);
//# sourceMappingURL=create-node.dto.js.map