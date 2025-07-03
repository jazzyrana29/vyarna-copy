import { TaskDto } from "./task.dto";
export declare class PaginatedTasksResponseDto {
    data: TaskDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
