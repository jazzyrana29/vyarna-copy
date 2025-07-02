// src/vy-active-campaign/dto/tags-response.dto.ts

import { TagsEnum } from "../../../enums/domain-person-and-identity/vy-active-campaign/tags.enum";

/**
 * Links related to a tag
 */
export class TagLinksDto {
  contactGoalTags: string;
  templateTags: string;
}

/**
 * Represents a single tag entity
 */
export class TagDto {
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

/**
 * Meta information for tags response
 */
export class TagsMetaDto {
  total: string;
}

/**
 * DTO wrapping the tags array and meta info in the API response
 */
export class TagsResponseDto {
  tags: TagDto[];
  meta: TagsMetaDto;
}
