import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="thankyou-page">
        {/* Visibility of System Status — Nielsen #1 */}
        <div className="thankyou-icon" aria-hidden="true">✓</div>

        <h1>Order Placed!</h1>
        <p className="thankyou-main">Thank you for shopping with AUREA.</p>
        <p>Your order has been received and confirmed.</p>
        <p>We will contact you on your provided phone number shortly.</p>

        {/* COD reminder — Match Real World (Nielsen #2) */}
        <div className="thankyou-cod-note">
          <p><strong>Payment:</strong> Cash on Delivery</p>
          <p><strong>Delivery:</strong> 3–5 business days</p>
        </div>

        {/* User Control — let them keep browsing (Nielsen #3) */}
        <div className="thankyou-actions">
          <button className="checkout-btn" onClick={() => navigate("/")}>
            Back to Home
          </button>
          <button
            className="continue-shopping"
            style={{ display: "block", margin: "12px auto 0" }}
            onClick={() => navigate("/jewellery")}
          >
            Continue Shopping →
          </button>
        </div>
      </div>
    </div>
  );
}
