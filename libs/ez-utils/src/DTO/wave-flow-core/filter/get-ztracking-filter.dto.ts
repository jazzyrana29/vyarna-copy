import { PickType } from "@nestjs/swagger";
import { FilterDto } from "./filter.dto";

export class GetZtrackingFilterDto extends PickType(FilterDto, ["filterId"]) {}
