export default function ShippingAddressCard() {
  return (
    <div className="bg-white border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
      <div className="text-gray-700">
        <p className="font-semibold">John Doe</p>
        <p>123 Main Street, Apt 4B</p>
        <p>New York, NY 10001</p>
        <p>United States</p>
        <p className="mt-2">Phone: +1 (555) 123-4567</p>
      </div>
    </div>
  );
}
