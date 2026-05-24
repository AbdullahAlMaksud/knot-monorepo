import axios, { AxiosError } from "axios";

type ApiErrorResponse = {
  message?: string;
  field?: string;
  data?: {
    field?: string;
    messageForUser?: string;
  };
};

const configuredBackendUrl = (
  process.env.NEXT_PUBLIC_API_URL || "https://byou-api.nexulyze.com"
).replace(/\/$/, "");
const backendApiBaseURL = configuredBackendUrl.endsWith("/api/v1")
  ? configuredBackendUrl
  : `${configuredBackendUrl}/api/v1`;
const apiBaseURL =
  typeof window === "undefined" ? backendApiBaseURL : "/api/v1";

const apiClient = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor: unwrap { success, data, message, code } envelope
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    const message =
      error.response?.data?.data?.messageForUser ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    const field =
      error.response?.data?.field || error.response?.data?.data?.field;

    if (process.env.NODE_ENV === "development") {
      console.error("[API Error]", {
        url: error.config?.url,
        status: error.response?.status,
        message,
      });
    }

    return Promise.reject(Object.assign(new Error(message), { field }));
  },
);

export default apiClient;
