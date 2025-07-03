"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyEvaluationVariableCollectionPortfoliosDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_variable_collection_portfolio_dto_1 = require("./evaluation-variable-collection-portfolio.dto");
class GetManyEvaluationVariableCollectionPortfoliosDto extends (0, swagger_1.PickType)(evaluation_variable_collection_portfolio_dto_1.EvaluationVariableCollectionPortfolioDto, ["businessUnitId", "isDeleted"]) {
}
exports.GetManyEvaluationVariableCollectionPortfoliosDto = GetManyEvaluationVariableCollectionPortfoliosDto;
//# sourceMappingURL=get-many-evaluation-variable-collection-portfolio.dto.js.map