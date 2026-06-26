"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { submitContact } from "@/screens/contact/services/api";
import type { ContactPayload } from "@/screens/contact/services/type";

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: (contactData: ContactPayload) => submitContact(contactData),
    onSuccess: (response) => {
      toast.success(response.message || "Message sent successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to send message. Please try again.");
    },
  });
};
