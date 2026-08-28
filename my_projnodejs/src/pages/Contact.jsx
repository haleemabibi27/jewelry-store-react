import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="contact-page">
        <ContactSection />
      </div>
    </>
  );
}
