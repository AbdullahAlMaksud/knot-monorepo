import { Package } from "lucide-react";

type ShippingStep = {
  status: string;
  date: string;
  completed: boolean;
};

type TrackingProgressProps = {
  shippingSteps: ShippingStep[];
};

export default function TrackingProgress({
  shippingSteps,
}: TrackingProgressProps) {
  return (
    <div className="bg-white border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Tracking Information</h2>
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
        <p className="font-mono font-semibold text-lg">TRK123456789ABC</p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-1">Shipping Method</p>
        <p className="font-semibold">Standard Shipping (3-5 business days)</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
        <p className="font-semibold">May 15, 2025</p>
      </div>

      <div className="mt-8">
        <div className="relative">
          {shippingSteps.map((step, index) => (
            <div key={index} className="flex gap-4 mb-6 last:mb-0">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    step.completed
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.completed ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <Package size={20} />
                  )}
                </div>
                {index < shippingSteps.length - 1 && (
                  <div
                    className={`w-0.5 h-12 ${
                      step.completed ? "bg-black" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 pb-2">
                <p
                  className={`font-semibold ${
                    step.completed ? "text-black" : "text-gray-500"
                  }`}
                >
                  {step.status}
                </p>
                <p className="text-sm text-gray-600">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
