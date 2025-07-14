"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEvaluationVariableCollectionPortfolioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variable_collection_portfolio_dto_1 = require("./evaluation-variable-collection-portfolio.dto");
class CreateEvaluationVariableCollectionPortfolioDto extends (0, swagger_1.PickType)(evaluation_variable_collection_portfolio_dto_1.EvaluationVariableCollectionPortfolioDto, ["businessUnitId", "name", "description", "updatedBy"]) {
}
exports.CreateEvaluationVariableCollectionPortfolioDto = CreateEvaluationVariableCollectionPortfolioDto;
//# sourceMappingURL=create-evaluation-variable-collection-portfolio.dto.js.map