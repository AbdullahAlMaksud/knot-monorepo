import apiClient from "@/lib/axios";
import type { ContactPayload, ContactResponse } from "@/screens/contact/services/type";

export const submitContact = async (
  payload: ContactPayload,
): Promise<ContactResponse> => {
  const response = await apiClient.post<ContactResponse>(
    "/website-managements/contacts",
    payload,
  );
  return response.data;
};
