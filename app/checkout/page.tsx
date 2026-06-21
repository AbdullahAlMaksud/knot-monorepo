"use client";

import { Suspense, useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import Layout from "@/components/Layout";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethodSection from "@/components/checkout/PaymentMethodSection";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useCart } from "@/lib/cart/CartContext";
import { CheckoutFormData } from "@/lib/orders/types";
import { useAuthSession } from "@/lib/auth-client";
import { useCreateOrder } from "@/services/orders/mutation";
import type { OrderPayloadType } from "@/services/orders/type";
import { useGetPublishedProducts } from "@/services/products/query";
import { getProductById } from "@/services/products/api";
import {
  getDefaultProductVariant,
  getProductVariants,
  getVariantPricing,
} from "@/services/products/utils";
import {
  clearStoredBuyNowItem,
  getStoredBuyNowItem,
  setStoredBuyNowItem,
} from "@/lib/checkout/buy-now";
import {
  DEFAULT_COUNTRY,
} from "@/lib/checkout/constants";
import { useUserCountry } from "@/hooks/useUserCountry";
import { useGetCurrencies, useGetShippingCharges, useValidateCoupon } from "@/services/checkout/query";

const formatBangladeshPhone = (phone: string): string => {
  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.startsWith("880") && digitsOnly.length >= 13) {
    return `0${digitsOnly.slice(3)}`.slice(0, 11);
  }

  if (digitsOnly.startsWith("0")) {
    return digitsOnly.slice(0, 11);
  }

  return `0${digitsOnly}`.slice(0, 11);
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutPageContent />
    </Suspense>
  );
}

function CheckoutPageContent() {
  const { data: session, isPending } = useAuthSession();
  const { id: userId } = session?.user || {};
  const searchParams = useSearchParams();
  const router = useRouter();
  const { items: cartItems, updateCartItems } = useCart();
  const { countryCode, country } = useUserCountry();
  const { data: currencies = [] } = useGetCurrencies();
  const { data: shippingCharges = [] } = useGetShippingCharges();

  const {
    data: publishedProducts = [],
    isLoading: areProductsLoading,
  } = useGetPublishedProducts();
  const [buyNowItem, setBuyNowItem] = useState(() => getStoredBuyNowItem());
  const [isUpdatingPricing, setIsUpdatingPricing] = useState(false);
  const isBuyNowCheckout =
    searchParams.get("mode") === "buy-now" && !!buyNowItem;
  const checkoutItems = useMemo(
    () => (isBuyNowCheckout && buyNowItem ? [buyNowItem] : cartItems),
    [buyNowItem, cartItems, isBuyNowCheckout],
  );

  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      country: country ?? DEFAULT_COUNTRY,
      countryIso2: countryCode ?? "BD",
    },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const selectedDistrict = useWatch({
    control,
    name: "state",
  });

  const selectedCountryIso = useWatch({
    control,
    name: "countryIso2",
  }) || "BD";

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const validateCouponMutation = useValidateCoupon();

  const targetCurrencyCode = useMemo(() => {
    const code = selectedCountryIso.toUpperCase();
    if (code === "BD") return "BDT";
    if (code === "CA") return "CAD";
    if (code === "GB") return "GBP";
    if (code === "US") return "USD";
    return "";
  }, [selectedCountryIso]);

  const activeCurrency = useMemo(() => {
    const matched = currencies.find((c) => c.code === targetCurrencyCode);
    if (matched) {
      return matched;
    }
    return (
      currencies.find((c) => c.isDefault) ??
      currencies.find((c) => c.code === "BDT") ??
      currencies[0]
    );
  }, [currencies, targetCurrencyCode]);

  const resolvedCheckoutItems = useMemo(() => {
    if (areProductsLoading || publishedProducts.length === 0) return checkoutItems;

    return checkoutItems.map((item) => {
      const product = publishedProducts.find(
        (p) => String(p._id) === String(item.id)
      );
      if (!product) return item;

      const defaultVariant = getDefaultProductVariant(product);
      const variant =
        getProductVariants(product).find((v) => v._id === item.variantId) ??
        defaultVariant;

      if (!variant) return item;

      const matchedPrice = variant.prices?.find((p) => p.currencyId?.code === activeCurrency?.code);
      const defaultPrice = variant.prices?.find((p) => p.isDefault) ?? variant.prices?.[0];
      const targetPrice = matchedPrice ?? defaultPrice;

      const tempVariant = {
        ...variant,
        price: targetPrice?.price ?? variant.price ?? 0,
        currency: targetPrice?.currencyId?.code ?? variant.currency ?? activeCurrency?.code ?? "BDT",
        discountType: targetPrice?.discountType ?? variant.discountType,
      };

      const pricing = getVariantPricing(tempVariant);

      return {
        ...item,
        price: pricing.discountedPrice,
        originalPrice: pricing.originalPrice,
        discountAmount: pricing.discountAmount,
        currency: pricing.currency,
        discountType: pricing.discountType,
        discountValue: typeof tempVariant.discountType === "object" ? Number((tempVariant.discountType as any).value || (tempVariant.discountType as any).amount) : (tempVariant.discountValue ? Number(tempVariant.discountValue) : undefined),
        maxDiscountValue: typeof tempVariant.discountType === "object" ? Number((tempVariant.discountType as any).maxValue || (tempVariant.discountType as any).maxAmount) : (tempVariant.discountMaxValue ? Number(tempVariant.discountMaxValue) : undefined),
        isDiscounted: pricing.hasDiscount,
      };
    });
  }, [checkoutItems, publishedProducts, areProductsLoading, activeCurrency]);

  const filteredCharges = useMemo(() => {
    if (!activeCurrency) return [];
    return shippingCharges.filter(
      (charge) => charge.currency?.code === activeCurrency.code
    );
  }, [shippingCharges, activeCurrency]);

  const activeShippingCharge = useMemo(() => {
    if (filteredCharges.length === 0) return null;
    if (selectedCountryIso === "BD") {
      const isDhaka = selectedDistrict?.trim().toLowerCase() === "dhaka";
      const targetType = isDhaka ? "INSIDE_DHAKA" : "OUTSIDE_DHAKA";
      return filteredCharges.find((c) => c.type === targetType) ?? filteredCharges[0];
    }
    return (
      filteredCharges.find((c) => c.type === "FLAT") ??
      filteredCharges.find((c) => c.type === "PERCENTAGE") ??
      filteredCharges[0]
    );
  }, [filteredCharges, selectedCountryIso, selectedDistrict]);

  const originalSubtotal = useMemo(() => {
    return resolvedCheckoutItems.reduce((sum, item) => {
      const orig = item.originalPrice ?? (item.price + (item.discountAmount ?? 0));
      return sum + orig * item.quantity;
    }, 0);
  }, [resolvedCheckoutItems]);

  const productDiscountTotal = useMemo(() => {
    return resolvedCheckoutItems.reduce((sum, item) => {
      return sum + (item.discountAmount ?? 0) * item.quantity;
    }, 0);
  }, [resolvedCheckoutItems]);

  const subtotal = useMemo(() => {
    return resolvedCheckoutItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }, [resolvedCheckoutItems]);

  const couponDiscountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;

    let discount = 0;
    if (appliedCoupon.discountType === "FLAT") {
      discount = appliedCoupon.discountValue;
    } else if (appliedCoupon.discountType === "PERCENTAGE" || appliedCoupon.discountType === "PERCENT") {
      discount = (subtotal * appliedCoupon.discountValue) / 100;
      if (appliedCoupon.maxDiscountAmount) {
        discount = Math.min(discount, appliedCoupon.maxDiscountAmount);
      }
    }
    return Math.round(Math.min(discount, subtotal));
  }, [appliedCoupon, subtotal]);

  const shippingFee = useMemo(() => {
    if (!activeShippingCharge) return 0;
    if (activeShippingCharge.type === "PERCENTAGE") {
      return (originalSubtotal * activeShippingCharge.amount) / 100;
    }
    return activeShippingCharge.amount;
  }, [activeShippingCharge, originalSubtotal]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - couponDiscountAmount) + shippingFee;
  }, [subtotal, couponDiscountAmount, shippingFee]);

  const isBangladesh = selectedCountryIso === "BD";

  const deliveryLabel = useMemo(() => {
    if (isBangladesh) {
      const isDhaka = selectedDistrict?.trim().toLowerCase() === "dhaka";
      return isDhaka ? "Inside Dhaka" : "Outside Dhaka";
    }
    return "International Shipping";
  }, [isBangladesh, selectedDistrict]);

  const estimatedDelivery = useMemo(() => {
    if (isBangladesh) {
      const isDhaka = selectedDistrict?.trim().toLowerCase() === "dhaka";
      return isDhaka ? "2-3 business days" : "3-5 business days";
    }
    return "7-10 business days";
  }, [isBangladesh, selectedDistrict]);

  const hasInitializedCountry = useRef(false);
  useEffect(() => {
    if (countryCode && !hasInitializedCountry.current) {
      setValue("countryIso2", countryCode.toUpperCase(), { shouldValidate: true });
    }
  }, [countryCode, setValue]);

  useEffect(() => {
    if (country && !hasInitializedCountry.current) {
      setValue("country", country, { shouldValidate: true });
      hasInitializedCountry.current = true;
    } else if (!country && !hasInitializedCountry.current) {
      setValue("country", DEFAULT_COUNTRY, { shouldValidate: true });
      hasInitializedCountry.current = true;
    }
  }, [country, setValue]);

  const lastProcessedCountryRef = useRef<string>("");

  useEffect(() => {
    if (!selectedCountryIso || currencies.length === 0) return;
    if (lastProcessedCountryRef.current === selectedCountryIso) return;

    lastProcessedCountryRef.current = selectedCountryIso;

    const updatePricing = async () => {
      setIsUpdatingPricing(true);
      try {
        const updatedItems = await Promise.all(
          checkoutItems.map(async (item) => {
            try {
              const product = await getProductById(String(item.id));
              const defaultVariant = getDefaultProductVariant(product);
              const variant =
                getProductVariants(product).find((v) => v._id === item.variantId) ??
                defaultVariant;

              if (!variant) return item;

              const matchedPrice = variant.prices?.find(
                (p) => p.currencyId?.code === activeCurrency?.code
              );
              const defaultPrice =
                variant.prices?.find((p) => p.isDefault) ?? variant.prices?.[0];
              const targetPrice = matchedPrice ?? defaultPrice;

              const tempVariant = {
                ...variant,
                price: targetPrice?.price ?? variant.price ?? 0,
                currency:
                  targetPrice?.currencyId?.code ??
                  variant.currency ??
                  activeCurrency?.code ??
                  "BDT",
                discountType: targetPrice?.discountType ?? variant.discountType,
              };

              const pricing = getVariantPricing(tempVariant);

              return {
                ...item,
                price: pricing.discountedPrice,
                originalPrice: pricing.originalPrice,
                discountAmount: pricing.discountAmount,
                currency: pricing.currency,
                discountType: pricing.discountType,
                discountValue:
                  typeof tempVariant.discountType === "object"
                    ? Number(
                        (tempVariant.discountType as any).value ||
                          (tempVariant.discountType as any).amount
                      )
                    : tempVariant.discountValue
                    ? Number(tempVariant.discountValue)
                    : undefined,
                maxDiscountValue:
                  typeof tempVariant.discountType === "object"
                    ? Number(
                        (tempVariant.discountType as any).maxValue ||
                          (tempVariant.discountType as any).maxAmount
                      )
                    : tempVariant.discountMaxValue
                    ? Number(tempVariant.discountMaxValue)
                    : undefined,
                isDiscounted: pricing.hasDiscount,
              };
            } catch (err) {
              console.error(`Failed to fetch product pricing for ${item.id}`, err);
              return item;
            }
          })
        );

        if (isBuyNowCheckout) {
          const buyNowUpdate = updatedItems[0];
          if (buyNowUpdate) {
            setBuyNowItem(buyNowUpdate);
            setStoredBuyNowItem(buyNowUpdate);
          }
        } else {
          updateCartItems(updatedItems);
        }
      } catch (err) {
        console.error("Error updating cart pricing:", err);
      } finally {
        setIsUpdatingPricing(false);
      }
    };

    updatePricing();
  }, [
    selectedCountryIso,
    currencies,
    activeCurrency,
    checkoutItems,
    isBuyNowCheckout,
    updateCartItems,
  ]);

  useEffect(() => {
    const storedCoupon = sessionStorage.getItem("byou_claimed_coupon_code");
    if (
      storedCoupon &&
      subtotal > 0 &&
      !appliedCoupon &&
      !validateCouponMutation.isPending &&
      !couponError
    ) {
      setCouponCodeInput(storedCoupon);
      validateCouponMutation.mutate(
        {
          code: storedCoupon,
          orderAmount: subtotal,
          userId: userId,
        },
        {
          onSuccess: (res) => {
            if (res.success && res.data) {
              setAppliedCoupon(res.data);
              setCouponError(null);
              sessionStorage.removeItem("byou_claimed_coupon_code");
            } else {
              setAppliedCoupon(null);
              setCouponError(res.message || "Invalid coupon code");
            }
          },
          onError: (err: any) => {
            setAppliedCoupon(null);
            const message =
              err.response?.data?.message ||
              err.message ||
              "Failed to validate coupon";
            setCouponError(message);
          },
        }
      );
    }
  }, [
    subtotal,
    userId,
    appliedCoupon,
    validateCouponMutation,
    couponError,
  ]);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent("/checkout")}`);
    }
  }, [session, isPending, router]);

  //  Backend field → frontend field mapping
  const fieldMap: Record<string, keyof CheckoutFormData> = {
    "shipment.name": "name",
    "shipment.email": "email",
    "shipment.phone": "phone",
    "shipment.addressLine": "apartment",
    "shipment.city": "city",
    "shipment.district": "state",
    "shipment.postalCode": "postalCode",
    "shipment.country": "country",
  };

  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder({
    clearCartOnSuccess: !isBuyNowCheckout,
    onSuccess: clearStoredBuyNowItem,
    onError: (error: Error & { field?: string }) => {
      const formField = fieldMap[error.field ?? ""];
      if (formField) {
        setError(formField, { type: "server", message: error.message });
      }
    },
  });

  const resolveCheckoutItems = () => {
    return checkoutItems.map((item) => {
      const product = publishedProducts.find(
        (publishedProduct) => publishedProduct._id === String(item.id),
      );
      const defaultVariant = getDefaultProductVariant(product);
      const selectedVariant =
        getProductVariants(product).find(
          (variant) => variant._id === item.variantId,
        ) ?? defaultVariant;

      return {
        variantId: selectedVariant?._id ?? "",
        quantity: item.quantity,
      };
    });
  };

  const handleApplyCoupon = () => {
    if (!couponCodeInput.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }
    setCouponError(null);
    validateCouponMutation.mutate(
      {
        code: couponCodeInput.trim(),
        orderAmount: subtotal,
        userId: userId,
      },
      {
        onSuccess: (res) => {
          if (res.success && res.data) {
            setAppliedCoupon(res.data);
            setCouponError(null);
          } else {
            setAppliedCoupon(null);
            setCouponError(res.message || "Invalid coupon code");
          }
        },
        onError: (err: any) => {
          setAppliedCoupon(null);
          const message = err.response?.data?.message || err.message || "Failed to validate coupon";
          setCouponError(message);
        },
      }
    );
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCodeInput("");
    setCouponError(null);
  };

  const onSubmit = async (data: CheckoutFormData) => {
    if (checkoutItems.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    if (areProductsLoading || isUpdatingPricing) {
      setSubmitError("Product details are still loading. Please try again.");
      return;
    }

    let orderedItems = resolveCheckoutItems();

    const hasInvalidItem = orderedItems.some(
      (item) => !item.variantId,
    );

    if (hasInvalidItem) {
      setSubmitError(
        "One or more cart items are missing a valid variant.",
      );
      return;
    }

    setSubmitError(null);

    const payload: OrderPayloadType = {
      ...(userId ? { customerId: userId } : {}),
      orderedItems,
      currencyId: activeCurrency?._id || "",
      orderAmount: total,
      shipment: {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: selectedCountryIso === "BD" ? formatBangladeshPhone(data.phone) : data.phone.trim(),
        addressLine: data.apartment?.trim() || undefined,
        city: data.city.trim(),
        district: data.state.trim(),
        postalCode: data.postalCode.trim(),
        country: data.country.trim(),
      },
      shippingChargeId: activeShippingCharge?._id || "",
      payment: {
        method: "CASH",
      },
      ...(appliedCoupon ? { couponCode: appliedCoupon.code } : {}),
      note: data.extraNotes?.trim() || undefined,
    };
    createOrder(payload);
  };

  if (isPending || !session?.user) {
    return (
      <Layout>
        <section className="py-16 sm:py-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500">Redirecting to login...</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 sm:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <ShippingForm
                  control={control}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                />

                <PaymentMethodSection
                  shippingFee={shippingFee}
                  currencySymbol={activeCurrency?.symbol}
                  estimatedDelivery={estimatedDelivery}
                  deliveryLabel={deliveryLabel}
                  selectedDistrict={selectedDistrict}
                />
              </form>
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={resolvedCheckoutItems}
                productDiscountTotal={productDiscountTotal}
                couponDiscountAmount={couponDiscountAmount}
                shippingFee={shippingFee}
                deliveryLabel={deliveryLabel}
                estimatedDelivery={estimatedDelivery}
                canConfirmOrder={isValid && !areProductsLoading && !isUpdatingPricing && !!activeCurrency && !!activeShippingCharge}
                onConfirmOrder={handleSubmit(onSubmit)}
                submitting={isCreatingOrder || isUpdatingPricing}
                submitError={submitError}
                currency={activeCurrency?.symbol}
                couponCodeInput={couponCodeInput}
                onCouponCodeChange={setCouponCodeInput}
                onApplyCoupon={handleApplyCoupon}
                isApplyingCoupon={validateCouponMutation.isPending}
                appliedCoupon={appliedCoupon}
                onRemoveCoupon={handleRemoveCoupon}
                couponError={couponError}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
