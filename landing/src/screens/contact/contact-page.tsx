import Layout from "@/components/common/layout";
import ContactFormSection from "@/screens/contact/components/contact-form-section";
import ContactMethodsSection from "@/screens/contact/components/contact-methods-section";
import FAQSection from "@/screens/contact/components/faq-section";
import TestimonialsSection from "@/components/shared/testimonials-section";

const ContactPage = () => {
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
};
export default ContactPage;
