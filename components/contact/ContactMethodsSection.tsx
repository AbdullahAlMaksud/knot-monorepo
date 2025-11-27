import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactMethodsSection() {
  return (
    <section className="py-16 sm:py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-light text-center mb-12">
          Other Ways to Reach Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Mail size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-400 text-sm">sooulmirrage@gmail.com</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Phone size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p className="text-gray-400 text-sm">+82 2 123 4567</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <p className="text-gray-400 text-sm">
              123 Beauty Lane, Gangnam, Seoul, South Korea
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
