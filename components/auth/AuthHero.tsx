import Image from "next/image";

export default function AuthHero() {
  return (
    <div className="relative h-[400px] sm:h-[600px] rounded-lg overflow-hidden">
      <Image
        src="/images/auth/auth-bg.png"
        alt="Auth Hero"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
