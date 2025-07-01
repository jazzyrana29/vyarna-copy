// src/active-campaign/active-campaign.service.ts
import axios, { AxiosInstance } from 'axios';
import * as process from 'process';
import { CreateContactDto } from './dto/request/create-contact.dto';
import { ContactResponseDto } from './dto/response/contact-response.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ListsResponseDto } from './dto/response/lists-response.dto';
import { SubscribeContactToListDto } from './dto/request/subscribe-contact-to-list.dto';
import { TagsResponseDto } from './dto/response/tags-response.dto';
import { AddTagToContactDto } from './dto/request/add-tag-to-contact.dto';

export class ActiveCampaignService {
  private static client: AxiosInstance;

  /**
   * Create a new contact in ActiveCampaign
   */
  static async createContact(
    contact: CreateContactDto,
  ): Promise<ContactResponseDto> {
    try {
      const response = await this.getClient().post('/contacts', { contact });
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0]?.title || 'unable to process';
      const status = error?.response?.status;

      console.error(
        `Error creating contact (POST /contacts):`,
        status,
        message,
      );
      throw new HttpException(
        message,
        status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Retrieve all lists
   */
  static async getLists(): Promise<ListsResponseDto> {
    try {
      const response = await this.getClient().get('/lists');
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0]?.title || 'unable to process';
      const status = error?.response?.status;

      console.error(`Error fetching lists (GET /lists):`, status, message);
      throw new HttpException(
        message,
        status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Retrieve all lists
   */
  static async subscribeContactToList(
    contactList: SubscribeContactToListDto,
  ): Promise<ListsResponseDto> {
    try {
      const response = await this.getClient().post('/contactLists', {
        contactList,
      });
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0]?.title || 'unable to process';
      const status = error?.response?.status;

      console.error(
        `Error subscribe contact to list (Post /contactLists):`,
        status,
        message,
      );
      throw new HttpException(
        message,
        status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Retrieve all tags
   */
  static async getTags(): Promise<TagsResponseDto> {
    try {
      const response = await this.getClient().get('/tags');
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0]?.title || 'unable to process';
      const status = error?.response?.status;

      console.error(`Error fetching tags (GET /tags):`, status, message);
      throw new HttpException(
        message,
        status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Retrieve all tags
   */
  static async addTagToContact(contactTag: AddTagToContactDto): Promise<any> {
    try {
      const response = await this.getClient().post('/contactTags', {
        contactTag,
      });
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0]?.title || 'unable to process';
      const status = error?.response?.status;

      console.error(
        `Error add tag to contact (POST /contactTags):`,
        status,
        message,
      );
      throw new HttpException(
        message,
        status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Lazy initialize and return the Axios client
   */
  private static getClient(): AxiosInstance {
    if (!this.client) {
      const { ACTIVE_CAMPAIGN_NAME, ACTIVE_CAMPAIGN_API_KEY } = process.env;
      if (!ACTIVE_CAMPAIGN_NAME) {
        throw new Error('Environment variable ACTIVE_CAMPAIGN_NAME is not set');
      }
      if (!ACTIVE_CAMPAIGN_API_KEY) {
        throw new Error(
          'Environment variable ACTIVE_CAMPAIGN_API_KEY is not set',
        );
      }

      this.client = axios.create({
        baseURL: `https://${ACTIVE_CAMPAIGN_NAME}.api-us1.com/api/3`,
        headers: {
          'Api-Token': ACTIVE_CAMPAIGN_API_KEY,
          'Content-Type': 'application/json',
        },
      });
    }
    return this.client;
  }

  // Add additional methods (updateContact, deleteContact, etc.) as needed
}
