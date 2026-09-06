import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // Error Prevention — Nielsen #5
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send message.");

      setStatusType("success");
      setStatus("Your message has been sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatusType("error");
      setStatus("Unable to send message. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-wrapper">
      <div className="contact-card">

        {/* LEFT PANEL */}
        <div className="contact-info">
          <h2>Contact Us</h2>
          <ul>
            <li>📍 i-10 MARKAZ<br />ISLAMABAD</li>
            <li>✉ hello@aurea.com</li>
            <li>📞 +92 3425604955</li>
            <li>☎ +0512345762</li>
          </ul>
          {/* FAQ hint — Help & Documentation (Nielsen #10) */}
          <div className="contact-faq-hint">
            <p style={{ marginTop: "30px", fontSize: "13px", opacity: 0.8 }}>
              <strong>Common Questions</strong>
            </p>
            <p style={{ fontSize: "13px", opacity: 0.7, lineHeight: 1.6 }}>
              📦 Delivery: 3–5 business days<br />
              💳 Payment: Cash on Delivery<br />
              🔄 Returns: Within 7 days
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="contact-form-box">
          <h2>Get in Touch</h2>
          <p>Feel free to drop us a line below</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                aria-label="Your name"
                className={errors.name ? "field-error" : ""}
              />
              {errors.name && <span className="field-error-msg" role="alert">{errors.name}</span>}
            </div>

            <div className="field-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                aria-label="Your email"
                className={errors.email ? "field-error" : ""}
              />
              {errors.email && <span className="field-error-msg" role="alert">{errors.email}</span>}
            </div>

            <div className="field-group">
              <textarea
                name="message"
                placeholder="Type your message here..."
                rows="5"
                value={form.message}
                onChange={handleChange}
                aria-label="Your message"
                className={errors.message ? "field-error" : ""}
              />
              {errors.message && <span className="field-error-msg" role="alert">{errors.message}</span>}
            </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          </form>

          {/* System Status Feedback — Nielsen #1 */}
          {status && (
            <p
              className={`form-status ${statusType === "success" ? "status-success" : "status-error"}`}
              role="alert"
              aria-live="polite"
            >
              {status}
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
