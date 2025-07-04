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
exports.BusinessUnit = void 0;
const typeorm_1 = require("typeorm");
const operator_entity_1 = require("./operator.entity");
let BusinessUnit = class BusinessUnit extends typeorm_1.BaseEntity {
};
exports.BusinessUnit = BusinessUnit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BusinessUnit.prototype, "businessUnitId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], BusinessUnit.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BusinessUnit, (businessUnit) => businessUnit.children, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'parentBusinessUnitId' }),
    __metadata("design:type", BusinessUnit)
], BusinessUnit.prototype, "parentBusinessUnit", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], BusinessUnit.prototype, "parentBusinessUnitId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BusinessUnit, (businessUnit) => businessUnit.parentBusinessUnit),
    __metadata("design:type", Array)
], BusinessUnit.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => operator_entity_1.Operator, (op) => op.businessUnit),
    __metadata("design:type", Array)
], BusinessUnit.prototype, "operators", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], BusinessUnit.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusinessUnit.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], BusinessUnit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BusinessUnit.prototype, "updatedAt", void 0);
exports.BusinessUnit = BusinessUnit = __decorate([
    (0, typeorm_1.Entity)('business_units', { schema: process.env.TIDB_DATABASE })
], BusinessUnit);
//# sourceMappingURL=business-unit.entity.js.map