import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import type { UserCountry } from "@/hooks/use-user-country";

countries.registerLocale(en);

export type CountryOption = {
  label: string;
  value: string;
};

export function getCountryOptions(): CountryOption[] {
  return Object.entries(countries.getNames("en", { select: "official" }))
    .map(([countryCode, country]) => ({
      label: country,
      value: countryCode,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function getCountryNameByCode(countryCode: string): string {
  return countries.getName(countryCode.toUpperCase(), "en") ?? countryCode;
}

export function createUserCountryFromCode(countryCode: string): UserCountry {
  const normalizedCountryCode = countryCode.toUpperCase();

  return {
    country: getCountryNameByCode(normalizedCountryCode),
    countryCode: normalizedCountryCode,
    detectedAt: new Date().toISOString(),
    source: "manual",
  };
}
