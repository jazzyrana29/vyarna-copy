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
exports.UpdateEvaluationVariableDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variable_dto_1 = require("./evaluation-variable.dto");
const class_validator_1 = require("class-validator");
class UpdateEvaluationVariableDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(evaluation_variable_dto_1.EvaluationVariableDto, [
    "name",
    "description",
    "evaluationVariableDataTypeId",
    "evaluationValueOptions",
])) {
}
exports.UpdateEvaluationVariableDto = UpdateEvaluationVariableDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Unique ID for the evaluation variable",
        example: "efdb74b8-5f62-4992-8462-cad1f9b36e83",
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateEvaluationVariableDto.prototype, "evaluationVariableId", void 0);
//# sourceMappingURL=update-evaluation-variable.dto.js.map