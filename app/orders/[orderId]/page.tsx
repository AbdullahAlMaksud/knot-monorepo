import Layout from "@/components/Layout";
import OrderHeader from "@/components/orders/OrderHeader";
import OrderItemsList from "@/components/orders/OrderItemsList";
import ShippingAddressCard from "@/components/orders/ShippingAddressCard";
import TrackingProgress from "@/components/orders/TrackingProgress";
import SupportSection from "@/components/orders/SupportSection";

const orderItems = [
  {
    id: 1,
    name: "Hydrating Essence",
    quantity: 1,
    price: 48.0,
    image: "/images/product1.jpg",
  },
  {
    id: 2,
    name: "Nourishing Cream",
    quantity: 1,
    price: 48.0,
    image: "/images/product2.jpg",
  },
];

const shippingSteps = [
  { status: "Order Placed", date: "May 10, 2025", completed: true },
  { status: "Processing", date: "May 11, 2025", completed: true },
  { status: "Shipped", date: "May 12, 2025", completed: true },
  {
    status: "Out for Delivery",
    date: "Expected May 15, 2025",
    completed: false,
  },
  { status: "Delivered", date: "Expected May 15, 2025", completed: false },
];

export default function OrderTrackingPage() {
  return (
    <Layout>
      <div className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <OrderHeader />
          <OrderItemsList orderItems={orderItems} />
          <ShippingAddressCard />
          <TrackingProgress shippingSteps={shippingSteps} />
          <SupportSection />
        </div>
      </div>
    </Layout>
  );
}
