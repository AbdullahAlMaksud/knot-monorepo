import apiClient from "@/lib/axios";
import type { ContactPayload, ContactResponse } from "./type";

export const submitContact = async (
  payload: ContactPayload,
): Promise<ContactResponse> => {
  const response = await apiClient.post<ContactResponse>(
    "/website-managements/contacts",
    payload,
  );
  return response.data;
};
