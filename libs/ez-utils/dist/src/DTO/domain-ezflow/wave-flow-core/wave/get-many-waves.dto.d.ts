import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";
export declare class GetManyWavesDto {
    waveStatus?: "InExecution" | "FailedWithError" | "Completed";
    executionFlowId?: string;
    waveTypeId?: string;
    isDeleted?: boolean;
    updatedBy?: string;
    executionStartDateFrom?: string;
    executionStartDateTo?: string;
    executionEndDateFrom?: string;
    executionEndDateTo?: string;
    pagination?: PaginationDto | null;
    sort?: SortOptionDto[];
}
