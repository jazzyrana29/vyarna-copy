import { PersonDto } from "./person.dto";
export declare class PaginatedPersonsResponseDto {
    data: PersonDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
