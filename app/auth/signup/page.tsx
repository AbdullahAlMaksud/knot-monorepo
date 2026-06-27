import { Suspense } from "react";
import Layout from "@/components/Layout";
import AuthHero from "@/components/auth/AuthHero";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <Layout>
      <section className="py-16 sm:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <AuthHero />
            <Suspense fallback={<div>Loading...</div>}>
              <SignUpForm />
            </Suspense>
          </div>
        </div>
      </section>
    </Layout>
  );
}
