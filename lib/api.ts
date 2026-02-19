const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiResponse<T> = {
  code: number;
  message: string;
  success: boolean;
   data?: T & { messageForUser?: string; field?: string };
};

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<{ data: T; message: string }> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const result: ApiResponse<T> = await res.json();

  if (!res.ok) {
    const message =
      result?.data?.messageForUser ||
      result?.message ||
      "Something went wrong";
    throw new Error(message);
  }

  return {  
    data: result.data as T,
    message: result.message,
  };
}