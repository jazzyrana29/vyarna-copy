import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {
  ContactResponseDto,
  CreateActiveCampaignContactDto,
  CreateContactListDto,
  CreateContactTagDto,
  ListsResponseDto,
  TagsResponseDto,
} from 'ez-utils';

@Injectable()
export class ActiveCampaignService {
  private client: AxiosInstance;

  async createContact(
    contact: CreateActiveCampaignContactDto,
  ): Promise<ContactResponseDto> {
    try {
      const response = await this.getClient().post('/contacts', { contact });
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0]?.title || 'unable to process';
      const status = error?.response?.status;
      throw new HttpException(
        message,
        status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLists(): Promise<ListsResponseDto> {
    try {
      const response = await this.getClient().get('/lists');
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0]?.title || 'unable to process';
      const status = error?.response?.status;
      throw new HttpException(
        message,
        status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async subscribeContactToList(
    contactList: CreateContactListDto,
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
      throw new HttpException(
        message,
        status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTags(): Promise<TagsResponseDto> {
    try {
      const response = await this.getClient().get('/tags');
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0]?.title || 'unable to process';
      const status = error?.response?.status;
      throw new HttpException(
        message,
        status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addTagToContact(contactTag: CreateContactTagDto): Promise<any> {
    try {
      const response = await this.getClient().post('/contactTags', {
        contactTag,
      });
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0]?.title || 'unable to process';
      const status = error?.response?.status;
      throw new HttpException(
        message,
        status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private getClient(): AxiosInstance {
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
}
