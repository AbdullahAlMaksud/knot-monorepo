const SupportSection = () => {
  return (
    <>
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Need Help?</h3>
        <p className="text-sm text-gray-600 mb-4">
          If you have any questions about your order or tracking information,
          please don't hesitate to contact our customer support team.
        </p>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:support@byou.com"
              className="text-black hover:underline"
            >
              support@byou.com
            </a>
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            <a href="tel:+15551234567" className="text-black hover:underline">
              +1 (555) 123-4567
            </a>
          </p>
          <p>
            <span className="font-semibold">Hours:</span> Monday - Friday, 9:00
            AM - 6:00 PM EST
          </p>
        </div>
      </div>
    </>
  );
};
export default SupportSection;
