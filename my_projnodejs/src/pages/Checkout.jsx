import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  // Redirect if cart empty
  if (cartItems.length === 0 && !loading) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div style={{ textAlign: "center", paddingTop: "200px", color: "#3B010B" }}>
          <p style={{ fontSize: "20px" }}>Your bag is empty.</p>
          <button className="checkout-btn" style={{ marginTop: "20px" }} onClick={() => navigate("/jewellery")}>
            Browse Jewellery
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // Error Prevention — Nielsen #5
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number (10–15 digits).";
    }
    if (!formData.address.trim()) newErrors.address = "Delivery address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    return newErrors;
  };

  const handleReviewOrder = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorField = document.querySelector(".field-error");
      if (firstErrorField) firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    // Show confirmation dialog — Error Prevention (Nielsen #5)
    setShowConfirm(true);
  };

  const handleConfirmOrder = async () => {
    setShowConfirm(false);
   setLoading(true);

/*👇 ADD THIS ONLY (for spinner visibility)
await new Promise(resolve => setTimeout(resolve, 1500));*/

    const orderData = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      paymentMethod: "Cash on Delivery",
      items: cartItems.map(item => ({
        productId: item._id,
        title: item.title,
        price: item.numericPrice,
        quantity: item.quantity
      })),
      totalPrice: cartTotal
    };

    try {
const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      if (!res.ok) throw new Error("Failed to place order");

      clearCart();
      navigate("/thank-you");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while placing your order. Please try again or contact us.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="checkout-page-wrapper">
        <div className="checkout-wrapper">

          {/* LEFT: ORDER SUMMARY */}
          <div className="checkout-summary">
            <h2>Your Order</h2>

            {/* Breadcrumb / back — User Control (Nielsen #3) */}
            <Link to="/bag" className="back-to-bag">← Edit Bag</Link>

            {cartItems.map(item => (
              <div className="summary-row" key={item._id}>
                <img src={item.img} alt={item.title} />
                <div className="summary-info">
                  <h4>{item.title}</h4>
                  <p>PKR {item.numericPrice?.toLocaleString()} × {item.quantity}</p>
                </div>
                <strong>PKR {(item.numericPrice * item.quantity).toLocaleString()}</strong>
              </div>
            ))}

            <div className="summary-total">
              <span>Total</span>
              <span>PKR {cartTotal.toLocaleString()}</span>
            </div>

            {/* COD label — Match Real World (Nielsen #2) */}
            <div className="cod-summary-badge">
              Cash on Delivery
            </div>
          </div>

          {/* RIGHT: CHECKOUT FORM */}
          <div className="checkout-page">
            <h1>Delivery Details</h1>

            <form className="checkout-form" onSubmit={handleReviewOrder} noValidate>

              <div className="field-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g. Muqaddas "
                  value={formData.fullName}
                  onChange={handleChange}
                  aria-required="true"
                  className={errors.fullName ? "field-error" : ""}
                />
                {errors.fullName && <span className="field-error-msg" role="alert">{errors.fullName}</span>}
              </div>

              <div className="field-group">
                <label htmlFor="email">Email Address (optional)</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. name@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "field-error" : ""}
                />
                {errors.email && <span className="field-error-msg" role="alert">{errors.email}</span>}
              </div>

              <div className="field-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g. 0300 1234567"
                  value={formData.phone}
                  onChange={handleChange}
                  aria-required="true"
                  className={errors.phone ? "field-error" : ""}
                />
                {errors.phone && <span className="field-error-msg" role="alert">{errors.phone}</span>}
              </div>

              <div className="field-group">
                <label htmlFor="address">Delivery Address *</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Street, House No., Area"
                  value={formData.address}
                  onChange={handleChange}
                  aria-required="true"
                  className={errors.address ? "field-error" : ""}
                />
                {errors.address && <span className="field-error-msg" role="alert">{errors.address}</span>}
              </div>

              <div className="field-group">
                <label htmlFor="city">City *</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="e.g. Islamabad"
                  value={formData.city}
                  onChange={handleChange}
                  aria-required="true"
                  className={errors.city ? "field-error" : ""}
                />
                {errors.city && <span className="field-error-msg" role="alert">{errors.city}</span>}
              </div>

              {/* Payment — always COD */}
              <div className="cod-box">
                <input type="radio" id="cod" checked readOnly aria-checked="true" />
                <label htmlFor="cod"> Cash on Delivery</label>
                <span style={{ fontSize: "12px", opacity: 0.7, marginLeft: "auto" }}>Only payment method</span>
              </div>

            <button type="submit" disabled={loading} className="confirm-order-btn">
              {loading ? (
                <>
                  <span className="spinner" aria-hidden="true"></span>
                  <span style={{ marginLeft: "8px" }}>Placing Order...</span>
                </>
              ) : (
                "REVIEW & PLACE ORDER"
              )}
            </button>

            </form>
          </div>
        </div>
      </div>

      {/* Order Confirmation Dialog — Error Prevention (Nielsen #5) */}
      {showConfirm && (
        <div className="confirm-overlay" role="dialog" aria-modal="true" aria-label="Confirm order">
          <div className="confirm-box confirm-order">
            <h3>Confirm Your Order</h3>
            <p>Delivering to: <strong>{formData.address}, {formData.city}</strong></p>
            <p>Phone: <strong>{formData.phone}</strong></p>
            <p>Total: <strong>PKR {cartTotal.toLocaleString()}</strong></p>
            <p style={{ fontSize: "13px", opacity: 0.7 }}>Payment: Cash on Delivery</p>
            <div className="confirm-actions">
              <button className="confirm-yes" onClick={handleConfirmOrder}>
                Yes, Place Order
              </button>
              <button className="confirm-no" onClick={() => setShowConfirm(false)}>
                Go Back & Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
