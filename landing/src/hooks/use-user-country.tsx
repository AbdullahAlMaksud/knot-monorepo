"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { STORAGE_KEYS } from "@/constants/storage";
import { reverseGeocodeCountry } from "@/screens/geolocation/services/reverse-geocode-country";
import { createUserCountryFromCode } from "@/utils/countries";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/storage";
import CountryConfirmModal from "@/screens/country/components/country-confirm-modal";

export type UserCountry = {
  country: string;
  countryCode: string;
  latitude?: number;
  longitude?: number;
  detectedAt: string;
  source: "geolocation" | "manual";
};

type UserCountryContextValue = {
  country?: string;
  countryCode?: string;
  userCountry: UserCountry | null;
  isDetecting: boolean;
  isModalOpen: boolean;
  detectedCountry: UserCountry | null;
  error: string | null;
  detectCountry: () => Promise<void>;
  confirmDetectedCountry: () => void;
  selectManualCountry: (countryCode: string) => void;
  clearCountry: () => void;
  closeModal: () => void;
};

const UserCountryContext = createContext<UserCountryContextValue | null>(null);

const getCurrentPosition = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation is not available in this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: 12000,
    });
  });

export function UserCountryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userCountry, setUserCountry] = useState<UserCountry | null>(null);
  const [detectedCountry, setDetectedCountry] = useState<UserCountry | null>(
    null,
  );
  const [isDetecting, setIsDetecting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const didCheckStorage = useRef(false);

  const saveCountry = useCallback((countryData: UserCountry) => {
    setLocalStorageItem(STORAGE_KEYS.USER_COUNTRY, countryData);
    setUserCountry(countryData);
    setDetectedCountry(null);
    setIsModalOpen(false);
    setError(null);
  }, []);

  const detectCountry = useCallback(async () => {
    const savedCountry = getLocalStorageItem<UserCountry>(
      STORAGE_KEYS.USER_COUNTRY,
    );

    if (savedCountry) {
      setUserCountry(savedCountry);
      setIsModalOpen(false);
      return;
    }

    setIsDetecting(true);
    setError(null);

    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const countryData = await reverseGeocodeCountry({ latitude, longitude });

      setDetectedCountry({
        ...countryData,
        latitude,
        longitude,
        detectedAt: new Date().toISOString(),
        source: "geolocation",
      });
      setIsModalOpen(true);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to detect your country.";

      setError(message);
      setDetectedCountry(null);
      setIsModalOpen(true);
    } finally {
      setIsDetecting(false);
    }
  }, []);

  const confirmDetectedCountry = useCallback(() => {
    if (!detectedCountry) return;
    saveCountry(detectedCountry);
  }, [detectedCountry, saveCountry]);

  const selectManualCountry = useCallback(
    (countryCode: string) => {
      saveCountry(createUserCountryFromCode(countryCode));
    },
    [saveCountry],
  );

  const clearCountry = useCallback(() => {
    removeLocalStorageItem(STORAGE_KEYS.USER_COUNTRY);
    setUserCountry(null);
    setDetectedCountry(null);
    queueMicrotask(() => void detectCountry());
  }, [detectCountry]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (didCheckStorage.current) return;
    didCheckStorage.current = true;

    const savedCountry = getLocalStorageItem<UserCountry>(
      STORAGE_KEYS.USER_COUNTRY,
    );

    if (savedCountry) {
      queueMicrotask(() => setUserCountry(savedCountry));
      return;
    }

    queueMicrotask(() => void detectCountry());
  }, [detectCountry]);

  const value = useMemo<UserCountryContextValue>(
    () => ({
      country: userCountry?.country,
      countryCode: userCountry?.countryCode,
      userCountry,
      isDetecting,
      isModalOpen,
      detectedCountry,
      error,
      detectCountry,
      confirmDetectedCountry,
      selectManualCountry,
      clearCountry,
      closeModal,
    }),
    [
      userCountry,
      isDetecting,
      isModalOpen,
      detectedCountry,
      error,
      detectCountry,
      confirmDetectedCountry,
      selectManualCountry,
      clearCountry,
      closeModal,
    ],
  );

  return (
    <UserCountryContext.Provider value={value}>
      {children}
      <CountryConfirmModal
        open={isModalOpen}
        detectedCountry={detectedCountry}
        error={error}
        isDetecting={isDetecting}
        onKeepCountry={confirmDetectedCountry}
        onSelectCountry={selectManualCountry}
        onClose={closeModal}
      />
    </UserCountryContext.Provider>
  );
}

export function useUserCountry(): UserCountryContextValue {
  const context = useContext(UserCountryContext);

  if (!context) {
    throw new Error("useUserCountry must be used within UserCountryProvider");
  }

  return context;
}
