import { wsApiService } from '../services/websocketApiService';
import type { CreateContactPayload } from '../constants/websocket-messages';

export const createContact = async (
  createContactPayload: CreateContactPayload,
): Promise<void> => {
  try {
    const response = await wsApiService.createContact(createContactPayload);

    if (response.success) {
      console.log('Contact created successfully:', response);
    } else {
      throw new Error('Failed to create contact');
    }
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};
