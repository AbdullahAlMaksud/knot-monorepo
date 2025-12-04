export default function ShippingAddressCard() {
  return (
    <div className="bg-white border rounded-lg p-6 mb-6">
      <div className="space-y-6">
        {/* Shipping Address */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <div className="text-sm text-gray-700 space-y-1">
            <p className="font-medium">John Doe</p>
            <p>john.doe@example.com</p>
            <p>(555) 123-4567</p>
            <p className="pt-2">Apt 4B</p>
            <p>123 Main Street</p>
            <p>New York, NY 10001</p>
            <p>United States</p>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-2">Shipping Method</h3>
          <p className="text-sm text-gray-600">
            Standard Shipping (5-7 business days)
          </p>
        </div>

        {/* Tracking Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Tracking Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Tracking Number:</span>
              <span className="font-medium">IZ9990A10123456784</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-medium">May 27-29, 2023</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
