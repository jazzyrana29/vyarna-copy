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
exports.Operator = void 0;
const typeorm_1 = require("typeorm");
const business_unit_entity_1 = require("./business-unit.entity");
let Operator = class Operator extends typeorm_1.BaseEntity {
};
exports.Operator = Operator;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Operator.prototype, "operatorId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Operator.prototype, "businessUnitId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_unit_entity_1.BusinessUnit, (bu) => bu.children, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'businessUnitId' }),
    __metadata("design:type", business_unit_entity_1.BusinessUnit)
], Operator.prototype, "businessUnit", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "rootBusinessUnitId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_unit_entity_1.BusinessUnit, (bu) => bu.children, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'rootBusinessUnitId' }),
    __metadata("design:type", business_unit_entity_1.BusinessUnit)
], Operator.prototype, "rootBusinessUnit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Operator.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Operator.prototype, "nameFirst", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "nameMiddle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Operator.prototype, "nameLast", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Operator.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Operator.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], Operator.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Operator.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], Operator.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Operator.prototype, "updatedAt", void 0);
exports.Operator = Operator = __decorate([
    (0, typeorm_1.Entity)('operators', { schema: process.env.TIDB_DATABASE }),
    (0, typeorm_1.Index)(['username', 'rootBusinessUnitId'], { unique: true }),
    (0, typeorm_1.Index)(['email'], { unique: true })
], Operator);
//# sourceMappingURL=operator.entity.js.map