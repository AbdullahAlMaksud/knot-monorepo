import { z } from "zod";

export interface UserSettingsDoc {
  _id?: string;
  ownerId: string; // userId if logged in, guestId otherwise
  isGuest: boolean;
  theme: "light" | "dark" | "system";
  lang: string;
  sound: boolean;
  vibration: boolean;
  musicVolume: number;
  sfxVolume: number;
  updatedAt: Date;
}

export const DEFAULT_SETTINGS: Omit<UserSettingsDoc, "ownerId" | "isGuest" | "updatedAt"> = {
  theme: "system",
  lang: "en",
  sound: true,
  vibration: true,
  musicVolume: 0.8,
  sfxVolume: 0.8,
};

export const updateSettingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).optional(),
  lang: z.string().min(2).max(10).optional(),
  sound: z.boolean().optional(),
  vibration: z.boolean().optional(),
  musicVolume: z.number().min(0).max(1).optional(),
  sfxVolume: z.number().min(0).max(1).optional(),
});
