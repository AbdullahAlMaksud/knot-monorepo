import Layout from "@/components/Layout";
import AuthHero from "@/components/auth/AuthHero";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <Layout>
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <AuthHero />
            <SignInForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
