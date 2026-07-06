import type { ReactNode } from "react";
import { cn, formatCurrencyValue } from "@/lib/utils";

type CurrencyAmountProps = {
  amount: number;
  currency?: ReactNode;
  className?: string;
  valueClassName?: string;
  currencyClassName?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

const CurrencyAmount = ({
  amount,
  currency = "BDT",
  className,
  valueClassName,
  currencyClassName,
  prefix,
  suffix,
}: CurrencyAmountProps) => {
  const isNegative = amount < 0;

  return (
    <span
      className={cn("inline-flex items-center gap-1 align-baseline", className)}
    >
      {prefix ? <span>{prefix}</span> : null}
      {isNegative ? <span aria-hidden="true">-</span> : null}
      <span className={valueClassName}>
        {formatCurrencyValue(Math.abs(amount))}
      </span>
      {currency ? <span className={currencyClassName}>{currency}</span> : null}
      {suffix ? <span>{suffix}</span> : null}
    </span>
  );
};

export default CurrencyAmount;
