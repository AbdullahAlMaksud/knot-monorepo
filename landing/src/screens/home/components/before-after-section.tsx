const BeforeAfterSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[400px] sm:h-[500px] rounded-lg overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-2">
            <div className="bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
              <span className="bg-white px-6 py-2 rounded-full text-sm font-semibold">
                Before
              </span>
            </div>
            <div className="bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="bg-white px-6 py-2 rounded-full text-sm font-semibold">
                After
              </span>
            </div>
          </div>
          <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-1 bg-white" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-gray-800 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default BeforeAfterSection;
