"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CountrySelector from "@/components/country/CountrySelector";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import type { UserCountry } from "@/hooks/useUserCountry";

type CountryConfirmModalProps = {
  open: boolean;
  detectedCountry: UserCountry | null;
  error: string | null;
  isDetecting: boolean;
  onKeepCountry: () => void;
  onSelectCountry: (countryCode: string) => void;
  onClose: () => void;
};

export default function CountryConfirmModal({
  open,
  detectedCountry,
  error,
  isDetecting,
  onKeepCountry,
  onSelectCountry,
  onClose,
}: CountryConfirmModalProps) {
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  useBodyScrollLock(open);

  if (!open) return null;

  const activeCountryCode =
    selectedCountryCode || detectedCountry?.countryCode || "";
  const canKeepDetectedCountry = Boolean(detectedCountry);
  const canSaveManualCountry = activeCountryCode.trim() !== "";
  const closeModal = () => {
    setSelectedCountryCode("");
    onClose();
  };
  const keepCountry = () => {
    setSelectedCountryCode("");
    onKeepCountry();
  };
  const saveCountry = () => {
    setSelectedCountryCode("");
    onSelectCountry(activeCountryCode);
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overscroll-contain bg-black/50 px-4 py-6"
      onWheel={(event) => event.stopPropagation()}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-5">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
            Country
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Confirm your country</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            {detectedCountry
              ? `We detected your country as ${detectedCountry.country}. Do you want to keep this country or switch to another one?`
              : "We could not detect your country automatically. Please choose your country to continue."}
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <CountrySelector
            value={activeCountryCode}
            onChange={setSelectedCountryCode}
            placeholder="Switch country"
          />

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              className="rounded-full"
            >
              Not now
            </Button>
            {canKeepDetectedCountry && (
              <Button
                type="button"
                variant="outline"
                onClick={keepCountry}
                disabled={isDetecting}
                className="rounded-full"
              >
                Keep {detectedCountry?.country}
              </Button>
            )}
            <Button
              type="button"
              onClick={saveCountry}
              disabled={!canSaveManualCountry || isDetecting}
              className="rounded-full"
            >
              Save country
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
