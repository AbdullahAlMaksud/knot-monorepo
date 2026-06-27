export interface WebsiteSocialLink {
  id: string;
  name: string;
  link: string;
}

export interface WebsiteLocation {
  id: string;
  title: string;
  addressLine: string;
  phone?: string;
}

export interface WebsiteSettingsInfo {
  _id: string;
  stockAlertOn?: number;
  socials?: WebsiteSocialLink[];
  locations?: WebsiteLocation[];
  email?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteSettingsInfoResponse {
  success: boolean;
  message: string;
  code: number;
  meta: null;
  data: WebsiteSettingsInfo;
}
