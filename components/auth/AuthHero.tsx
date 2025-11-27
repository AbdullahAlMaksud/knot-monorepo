export default function AuthHero() {
  return (
    <div className="relative h-[400px] sm:h-[600px] rounded-lg overflow-hidden">
      <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 sm:w-48 sm:h-48 bg-white/30 rounded-full mx-auto mb-4" />
          <div className="space-y-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/30 rounded-full mx-auto" />
            <div className="flex justify-center gap-2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/30 rounded-full" />
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
