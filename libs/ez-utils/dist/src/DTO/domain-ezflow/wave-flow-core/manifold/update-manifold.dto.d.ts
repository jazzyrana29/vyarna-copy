import { ManifoldDto } from "./manifold.dto";
declare const UpdateManifoldDto_base: import("@nestjs/common").Type<Partial<Pick<ManifoldDto, keyof ManifoldDto>>>;
export declare class UpdateManifoldDto extends UpdateManifoldDto_base {
    manifoldId: string;
}
export {};
