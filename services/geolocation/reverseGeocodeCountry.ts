import { getCountryNameByCode } from "@/utils/countries";

export type ReverseGeocodeCountryResult = {
  country: string;
  countryCode: string;
};

type CoordinateBounds = {
  countryCode: string;
  boxes: Array<{
    south: number;
    west: number;
    north: number;
    east: number;
  }>;
};

const STATIC_COUNTRY_BOUNDS: CoordinateBounds[] = [
  { countryCode: "BD", boxes: [{ south: 20.37, west: 88, north: 26.64, east: 92.68 }] },
  { countryCode: "MV", boxes: [{ south: -0.7, west: 72.5, north: 7.2, east: 74.9 }] },
  { countryCode: "NP", boxes: [{ south: 26.3, west: 80, north: 30.5, east: 88.2 }] },
  { countryCode: "BT", boxes: [{ south: 26.7, west: 88.7, north: 28.4, east: 92.2 }] },
  { countryCode: "LK", boxes: [{ south: 5.9, west: 79.5, north: 9.9, east: 82.1 }] },
  { countryCode: "IN", boxes: [{ south: 6.55, west: 68.1, north: 35.67, east: 97.4 }] },
  { countryCode: "PK", boxes: [{ south: 23.6, west: 60.8, north: 37.1, east: 77.9 }] },
  { countryCode: "MM", boxes: [{ south: 9.5, west: 92.1, north: 28.6, east: 101.2 }] },
  { countryCode: "TH", boxes: [{ south: 5.6, west: 97.3, north: 20.5, east: 105.7 }] },
  { countryCode: "MY", boxes: [{ south: 0.8, west: 99.6, north: 7.5, east: 119.3 }] },
  { countryCode: "SG", boxes: [{ south: 1.16, west: 103.59, north: 1.48, east: 104.1 }] },
  { countryCode: "ID", boxes: [{ south: -11.1, west: 95, north: 6.1, east: 141 }] },
  { countryCode: "PH", boxes: [{ south: 4.5, west: 116.9, north: 21.3, east: 126.6 }] },
  { countryCode: "VN", boxes: [{ south: 8.2, west: 102.1, north: 23.4, east: 109.5 }] },
  { countryCode: "CN", boxes: [{ south: 18.1, west: 73.5, north: 53.6, east: 134.8 }] },
  { countryCode: "JP", boxes: [{ south: 24, west: 122.9, north: 45.6, east: 153.9 }] },
  { countryCode: "KR", boxes: [{ south: 33, west: 124.5, north: 38.6, east: 131.9 }] },
  { countryCode: "AE", boxes: [{ south: 22.5, west: 51.5, north: 26.4, east: 56.4 }] },
  { countryCode: "SA", boxes: [{ south: 16.3, west: 34.5, north: 32.2, east: 55.7 }] },
  { countryCode: "QA", boxes: [{ south: 24.4, west: 50.7, north: 26.2, east: 51.7 }] },
  { countryCode: "KW", boxes: [{ south: 28.5, west: 46.5, north: 30.1, east: 48.5 }] },
  { countryCode: "OM", boxes: [{ south: 16.6, west: 52, north: 26.4, east: 59.9 }] },
  { countryCode: "GB", boxes: [{ south: 49.9, west: -8.7, north: 60.9, east: 1.8 }] },
  { countryCode: "IE", boxes: [{ south: 51.4, west: -10.7, north: 55.4, east: -5.4 }] },
  { countryCode: "FR", boxes: [{ south: 41.3, west: -5.2, north: 51.1, east: 9.6 }] },
  { countryCode: "DE", boxes: [{ south: 47.2, west: 5.8, north: 55.1, east: 15.1 }] },
  { countryCode: "IT", boxes: [{ south: 35.4, west: 6.6, north: 47.1, east: 18.6 }] },
  { countryCode: "ES", boxes: [{ south: 27.6, west: -18.2, north: 43.8, east: 4.4 }] },
  { countryCode: "NL", boxes: [{ south: 50.7, west: 3.3, north: 53.7, east: 7.3 }] },
  { countryCode: "BE", boxes: [{ south: 49.5, west: 2.5, north: 51.6, east: 6.4 }] },
  { countryCode: "AU", boxes: [{ south: -43.7, west: 112.9, north: -10, east: 153.7 }] },
  {
    countryCode: "US",
    boxes: [
      { south: 24.39, west: -125, north: 49.38, east: -66.93 },
      { south: 51.2, west: -179.2, north: 71.5, east: -129.9 },
      { south: 18.9, west: -160.3, north: 22.3, east: -154.7 },
    ],
  },
  { countryCode: "CA", boxes: [{ south: 41.7, west: -141, north: 83.1, east: -52.6 }] },
];

const isInsideBox = (
  latitude: number,
  longitude: number,
  box: CoordinateBounds["boxes"][number],
): boolean =>
  latitude >= box.south &&
  latitude <= box.north &&
  longitude >= box.west &&
  longitude <= box.east;

export function reverseGeocodeCountry(params: {
  latitude: number;
  longitude: number;
}): Promise<ReverseGeocodeCountryResult> {
  const match = STATIC_COUNTRY_BOUNDS.find((countryBounds) =>
    countryBounds.boxes.some((box) =>
      isInsideBox(params.latitude, params.longitude, box),
    ),
  );

  if (!match) {
    return Promise.reject(
      new Error("Unable to match your location to a supported country."),
    );
  }

  return Promise.resolve({
    country: getCountryNameByCode(match.countryCode),
    countryCode: match.countryCode,
  });
}
