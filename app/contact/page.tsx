import Layout from "@/components/Layout";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactMethodsSection from "@/components/contact/ContactMethodsSection";
import FAQSection from "@/components/contact/FAQSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";

export default function ContactPage() {
  return (
    <Layout>
      <div className="pt-32">
        <ContactFormSection />
        <ContactMethodsSection />
        <FAQSection />
        <TestimonialsSection />
      </div>
    </Layout>
  );
}
