"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryMockFactory = void 0;
const jestMock = require("jest-mock");
exports.repositoryMockFactory = jestMock.fn(() => ({
    findOne: jestMock.fn((entity) => entity),
    findOneBy: jestMock.fn((entity) => entity),
    find: jestMock.fn((entity) => entity),
    create: jestMock.fn((entity) => entity),
    save: jestMock.fn((entity) => entity),
    update: jestMock.fn((entity) => entity),
    createQueryBuilder: jestMock.fn((entity) => entity),
}));
//# sourceMappingURL=unitTests.js.map