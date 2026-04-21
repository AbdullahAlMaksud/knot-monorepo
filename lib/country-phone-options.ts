import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import {
  getCountryCallingCode,
  isSupportedCountry,
  type CountryCode,
} from "libphonenumber-js";

countries.registerLocale(enLocale);

const MAX_E164_DIGITS = 15;

export type CountryPhoneOption = {
  iso2: CountryCode;
  name: string;
  dialCode: string;
  label: string;
  maxNationalNumberLength: number;
};

export const countryPhoneOptions: CountryPhoneOption[] = Object.entries(
  countries.getNames("en", { select: "official" }),
)
  .filter(([iso2]) => isSupportedCountry(iso2))
  .map(([iso2, name]) => {
    const country = iso2 as CountryCode;
    const callingCode = getCountryCallingCode(country);

    return {
      iso2: country,
      name,
      dialCode: `+${callingCode}`,
      label: `${name} (+${callingCode})`,
      maxNationalNumberLength: MAX_E164_DIGITS - callingCode.length,
    };
  })
  .sort((left, right) => {
    if (left.iso2 === "BD") {
      return -1;
    }

    if (right.iso2 === "BD") {
      return 1;
    }

    return left.name.localeCompare(right.name);
  });

export function getCountryPhoneOption(iso2?: string) {
  return (
    countryPhoneOptions.find((option) => option.iso2 === iso2) ??
    countryPhoneOptions.find((option) => option.iso2 === "BD") ??
    countryPhoneOptions[0]
  );
}
