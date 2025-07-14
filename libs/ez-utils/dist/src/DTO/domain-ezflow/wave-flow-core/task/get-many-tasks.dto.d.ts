import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
export declare class GetManyTasksDto {
    nodeId?: string;
    waveId?: string;
    updatedBy?: string;
    taskStatusName?: string;
    isDeleted?: boolean;
    dateStartFrom?: string;
    dateStartTo?: string;
    dateEndFrom?: string;
    dateEndTo?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
