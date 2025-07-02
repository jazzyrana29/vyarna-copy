// src/vy-active-campaign/dto/lists-response.dto.ts

import { ListsEnum } from "../../../../../enum/lists.enum";

/**
 * DTO for the nested links object inside each list
 */
export class ListLinksDto {
  contactGoalLists: string;
  user: string;
  addressLists: string;
}

/**
 * DTO representing a single list item
 */
export class ListDto {
  stringid: string;
  userid: string;
  name: ListsEnum;
  cdate: string;
  p_use_tracking: string;
  p_use_analytics_read: string;
  p_use_analytics_link: string;
  p_use_twitter: string;
  p_use_facebook: string;
  p_embed_image: string;
  p_use_captcha: string;
  send_last_broadcast: string;
  private: string;
  analytics_domains: string | null;
  analytics_source: string;
  analytics_ua: string;
  twitter_token: string;
  twitter_token_secret: string;
  facebook_session: string | null;
  carboncopy: string;
  subscription_notify: string;
  unsubscription_notify: string;
  require_name: string;
  get_unsubscribe_reason: string;
  to_name: string;
  optinoptout: string;
  sender_name: string;
  sender_addr1: string;
  sender_addr2: string;
  sender_city: string;
  sender_state: string;
  sender_zip: string;
  sender_country: string;
  sender_phone: string;
  sender_url: string;
  sender_reminder: string;
  fulladdress: string;
  optinmessageid: string;
  optoutconf: string;
  deletestamp: string | null;
  udate: string;
  created_timestamp: string;
  updated_timestamp: string;
  created_by: string | null;
  updated_by: string | null;
  channel: string;
  description: string;
  non_deleted_subscribers: string;
  active_subscribers: string;
  links: ListLinksDto;
  id: string;
  user: string;
}

/**
 * DTO wrapping the lists array in the API response
 */
export class ListsResponseDto {
  lists: ListDto[];
}
