import { PersonWithoutPasswordDto } from "./person-without-password.dto";
export declare class PaginatedPersonsResponseDto {
    data: PersonWithoutPasswordDto[];
    maxPages: number | null;
    currentPage: number | null;
    pageSize: number | null;
    isPaginated: boolean;
}
