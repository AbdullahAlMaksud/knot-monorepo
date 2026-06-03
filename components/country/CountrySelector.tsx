"use client";

import { useMemo } from "react";
import { getCountryOptions } from "@/utils/countries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CountrySelectorProps = {
  value?: string;
  onChange: (countryCode: string) => void;
  placeholder?: string;
  className?: string;
};

export default function CountrySelector({
  value,
  onChange,
  placeholder = "Select country",
  className,
}: CountrySelectorProps) {
  const options = useMemo(() => getCountryOptions(), []);

  return (
    <Select value={value ?? ""} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
