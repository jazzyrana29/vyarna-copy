import { Repository } from "typeorm";
export type MockType<T> = {
    [P in keyof T]?: jest.Mock<any>;
};
export declare const repositoryMockFactory: () => MockType<Repository<any>>;
