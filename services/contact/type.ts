export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}
