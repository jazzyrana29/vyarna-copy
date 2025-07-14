"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEvaluationVariableCollectionPortfolioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variable_collection_portfolio_dto_1 = require("./evaluation-variable-collection-portfolio.dto");
class UpdateEvaluationVariableCollectionPortfolioDto extends (0, swagger_1.PickType)(evaluation_variable_collection_portfolio_dto_1.EvaluationVariableCollectionPortfolioDto, [
    "evaluationVariableCollectionPortfolioId",
    "name",
    "description",
    "updatedBy",
]) {
}
exports.UpdateEvaluationVariableCollectionPortfolioDto = UpdateEvaluationVariableCollectionPortfolioDto;
//# sourceMappingURL=update-evaluation-variable-collection-portfolio.dto.js.map