"use client";

import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";
import { Button } from "@/components/ui/button";
import CurrencyAmount from "@/components/ui/currency-amount";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items: cartItems, updateQuantity, removeItem, total } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:w-[360px] p-0 flex flex-col h-full bg-white border-l border-stone-200"
        showCloseButton={false}
        data-lenis-prevent
      >
        {/* Header */}
        <SheetHeader className="bg-black text-white p-5 flex flex-row items-center justify-between space-y-0 shrink-0">
          <SheetTitle className="text-xl font-semibold text-white">Cart</SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X size={24} />
          </Button>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              Your cart is empty
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.id}-${item.variantId ?? "default"}`}
                className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                {/* Product Image */}
                <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
                  <Image
                     src={item.image}
                     alt={item.name}
                     fill
                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                     className="object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-sm mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-sm font-semibold">
                          <CurrencyAmount amount={item.price} />
                        </p>
                        {item.isDiscounted && item.originalPrice && item.originalPrice > item.price && (
                          <>
                            <span className="text-xs text-gray-400 line-through">
                              <CurrencyAmount amount={item.originalPrice} />
                            </span>
                            <span className="inline-flex items-center bg-red-50 text-red-700 px-1 py-0.2 rounded text-[9px] font-bold">
                              {item.discountType === "PERCENTAGE" || item.discountType === "PERCENT"
                                ? `-${Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%`
                                : `-${item.originalPrice - item.price} ${item.currency === "BDT" ? "৳" : item.currency || ""}`}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id, item.variantId)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1,
                          item.variantId,
                        )
                      }
                      className="w-7 h-7 rounded-full"
                    >
                      <Minus size={14} />
                    </Button>
                    <span className="w-7 text-center font-medium text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1,
                          item.variantId,
                        )
                      }
                      className="w-7 h-7 rounded-full"
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-5 space-y-3 shrink-0">
          <div className="flex items-center justify-between text-xl font-bold">
            <span>Total</span>
            <span>
              <CurrencyAmount amount={total} />
            </span>
          </div>
          <Button className="w-full rounded-full font-semibold" asChild onClick={onClose}>
            <Link href="/checkout">Check Out</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
