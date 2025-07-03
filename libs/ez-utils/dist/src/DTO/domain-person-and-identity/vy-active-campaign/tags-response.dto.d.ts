import { TagsEnum } from "../../../enums/domain-person-and-identity/vy-active-campaign/tags.enum";
export declare class TagLinksDto {
    contactGoalTags: string;
    templateTags: string;
}
export declare class TagDto {
    tagType: string;
    tag: TagsEnum;
    description: string;
    subscriber_count: string;
    cdate: string;
    created_timestamp: string;
    updated_timestamp: string;
    created_by: string | null;
    updated_by: string | null;
    deleted: string;
    links: TagLinksDto;
    id: string;
}
export declare class TagsMetaDto {
    total: string;
}
export declare class TagsResponseDto {
    tags: TagDto[];
    meta: TagsMetaDto;
}
