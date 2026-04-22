import type { ReactNode } from "react";
import TakaIcon from "@/components/icons/TakaIcon";
import { cn, formatCurrencyValue } from "@/lib/utils";

type CurrencyAmountProps = {
  amount: number;
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

const CurrencyAmount = ({
  amount,
  className,
  iconClassName,
  valueClassName,
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
      <TakaIcon className={cn("text-current", iconClassName)} />
      <span className={valueClassName}>
        {formatCurrencyValue(Math.abs(amount))}
      </span>
      {suffix ? <span>{suffix}</span> : null}
    </span>
  );
};

export default CurrencyAmount;
