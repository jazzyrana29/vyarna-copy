import { ManifoldDto } from "../manifold/manifold.dto";
import { FilterSubsetDto } from "../filter-subset/filter-subset.dto";
import { NodeExitDto } from "../node-exit/node-exit.dto";
export declare class FilterDto {
    filterId: string;
    filterName: string;
    filterDescription: string;
    isActive: boolean;
    manifoldOrder: number;
    manifold: ManifoldDto;
    manifoldId: string;
    filterSubsets: FilterSubsetDto[];
    nodeExit: NodeExitDto;
    nodeExitId: string;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
