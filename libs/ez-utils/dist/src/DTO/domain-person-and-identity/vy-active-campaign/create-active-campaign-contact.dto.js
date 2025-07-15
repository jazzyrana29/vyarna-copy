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
exports.CreateActiveCampaignContactDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const tags_enum_1 = require("../../../enums/domain-person-and-identity/vy-active-campaign/tags.enum");
class CreateActiveCampaignContactDto {
}
exports.CreateActiveCampaignContactDto = CreateActiveCampaignContactDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "First Name of the contact",
        example: "Joe",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateActiveCampaignContactDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Last Name of the contact",
        example: "Goldberg",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateActiveCampaignContactDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Email of the contact",
        example: "joe-golberg@gmail.com",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateActiveCampaignContactDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "form id of the contact",
        enum: tags_enum_1.TagsEnum,
        example: tags_enum_1.TagsEnum.SIGNUP_HOME_TOP,
    }),
    (0, class_validator_1.IsEnum)(tags_enum_1.TagsEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateActiveCampaignContactDto.prototype, "formId", void 0);
//# sourceMappingURL=create-active-campaign-contact.dto.js.map