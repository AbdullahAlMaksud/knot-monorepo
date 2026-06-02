"use client";

import CountrySelector from "@/components/country/CountrySelector";
import { useUserCountry } from "@/hooks/useUserCountry";

export default function CountryPreferenceSection() {
  const { countryCode, selectManualCountry } = useUserCountry();

  return (
    <section className="bg-white">
      <h2 className="text-xl font-semibold mb-6">Current Country</h2>
      <div className="max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country
        </label>
        <CountrySelector
          value={countryCode}
          onChange={selectManualCountry}
          placeholder="Select your country"
        />
        <p className="mt-2 text-sm text-gray-500">
          This only updates your browser preference.
        </p>
      </div>
    </section>
  );
}
