import { Repository } from "typeorm";

const jestMock = require("jest-mock");

export type MockType<T> = {
  // @ts-ignore
  [P in keyof T]?: jest.Mock<any>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> =
  jestMock.fn(() => ({
    // @ts-ignore
    findOne: jestMock.fn((entity) => entity),
    // @ts-ignore
    findOneBy: jestMock.fn((entity) => entity),
    // @ts-ignore
    find: jestMock.fn((entity) => entity),
    // @ts-ignore
    create: jestMock.fn((entity) => entity),
    // @ts-ignore
    save: jestMock.fn((entity) => entity),
    // @ts-ignore
    update: jestMock.fn((entity) => entity),
    // @ts-ignore
    createQueryBuilder: jestMock.fn((entity) => entity),
  }));
