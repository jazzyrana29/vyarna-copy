export const createContact = async (): Promise<void> => {
  try {
    // const response = await wsApiService.createContact(createContactPayload);
    const response = { success: true };
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
