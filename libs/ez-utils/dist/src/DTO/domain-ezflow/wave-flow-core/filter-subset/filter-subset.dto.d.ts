import { FilterSubsetItemDto } from "../filter-subset-item/filter-subset-item.dto";
import { FilterDto } from "../filter/filter.dto";
export declare class FilterSubsetDto {
    filterSubsetId: string;
    filterId: string;
    filterOrder: number;
    filterSubsetInternalLogicalBinding: string;
    nextFilterSubsetLogicalBinding?: string;
    filter: FilterDto;
    filterSubsetItems: FilterSubsetItemDto[];
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}
