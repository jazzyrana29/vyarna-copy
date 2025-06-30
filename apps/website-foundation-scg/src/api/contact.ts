import api from "../utils/api";
import { CreateContactPayload } from "./types/contact";

export const createContact = async (
  createContactPayload: CreateContactPayload,
): Promise<void> => {
  const { data } = await api.post(
    "/contact/create-contact",
    createContactPayload,
  );
  console.log(data);
};
