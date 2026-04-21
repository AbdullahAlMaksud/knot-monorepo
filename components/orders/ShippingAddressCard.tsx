import { Order } from "@/lib/orders/types";
import { DELIVERY_OPTIONS } from "@/lib/checkout/constants";

export default function ShippingAddressCard({
  shipping,
}: {
  shipping: Order["shipping"];
}) {
  const addressLines = [
    shipping.apartment,
    [shipping.city, shipping.state, shipping.postalCode]
      .filter(Boolean)
      .join(", "),
    shipping.country,
  ].filter(Boolean);
  const deliveryArea = shipping.deliveryArea ?? "outside-dhaka";
  const deliveryLabel = DELIVERY_OPTIONS[deliveryArea].label;
  const estimatedDelivery =
    shipping.estimatedDelivery ??
    DELIVERY_OPTIONS[deliveryArea].estimatedDelivery;

  return (
    <div className="bg-white border rounded-lg p-6 mb-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <div className="text-sm text-gray-700 space-y-1">
            <p className="font-medium">{shipping.name || "—"}</p>
            <p>{shipping.email || "—"}</p>
            <p>{shipping.phone || "—"}</p>
            {addressLines.length > 0 && (
              <>
                <p className="pt-2">{addressLines.join(", ")}</p>
              </>
            )}
            {shipping.extraNotes && (
              <p className="pt-2 text-gray-600">Note: {shipping.extraNotes}</p>
            )}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-2">Shipping Method</h3>
          <p className="text-sm text-gray-600">
            Cash on Delivery • {deliveryLabel}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Estimated delivery: {estimatedDelivery}
          </p>
        </div>
      </div>
    </div>
  );
}
