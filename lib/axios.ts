import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor: unwrap { success, data, message, code } envelope
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (
    error: AxiosError<{ message?: string; data?: { messageForUser?: string } }>,
  ) => {
    const message =
      error.response?.data?.data?.messageForUser ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    if (process.env.NODE_ENV === "development") {
      console.error("[API Error]", {
        url: error.config?.url,
        status: error.response?.status,
        message,
      });
    }

    return Promise.reject(new Error(message));
  },
);

export default apiClient;
