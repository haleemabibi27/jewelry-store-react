import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Bag() {
  const { cartItems, updateQuantity, removeItem, cartTotal } = useCart();
  const navigate = useNavigate();
  const [confirmRemove, setConfirmRemove] = useState(null); // holds item id pending removal

  // User Control & Freedom — Nielsen #3: confirm accidental removal
  const handleRemoveRequest = (item) => {
    setConfirmRemove(item);
  };

  const handleConfirmRemove = () => {
    removeItem(confirmRemove._id);
    setConfirmRemove(null);
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="bag-page">
        {/* Breadcrumb — Consistency & Standards (Nielsen #4) */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link> › <span>Shopping Bag</span>
        </nav>

        <h1>Your Bag
          {cartItems.length > 0 && (
            <span className="bag-count-label"> ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})</span>
          )}
        </h1>

        {/* Empty bag state — Match Real World (Nielsen #2) */}
        {cartItems.length === 0 && (
          <div className="empty-bag">
            <p style={{ fontSize: "48px", marginBottom: "10px" }}>🛍</p>
            <p style={{ fontSize: "18px", marginBottom: "6px" }}>Your bag is empty.</p>
            <p style={{ opacity: 0.7, marginBottom: "24px" }}>Looks like you haven't added anything yet.</p>
            <button className="checkout-btn" onClick={() => navigate("/jewellery")}>
              Browse Jewellery
            </button>
          </div>
        )}

        {cartItems.map(item => (
          <div className="bag-row" key={item._id}>
            <img src={item.img} alt={item.title} />
            <div className="bag-item-info">
              <h4>{item.title}</h4>
              <p>PKR {item.numericPrice?.toLocaleString()}</p>

              {/* Quantity controls — User Control (Nielsen #3) */}
              <div className="qty-controls" role="group" aria-label={`Quantity for ${item.title}`}>
                <button
                  onClick={() => updateQuantity(item._id, -1)}
                  aria-label="Decrease quantity"
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span aria-live="polite">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, 1)} aria-label="Increase quantity">
                  +
                </button>
              </div>
            </div>

            <p className="bag-row-total">
              PKR {(item.numericPrice * item.quantity).toLocaleString()}
            </p>

            <button
              className="remove-btn"
              onClick={() => handleRemoveRequest(item)}
              aria-label={`Remove ${item.title} from bag`}
              title="Remove item"
            >
              ✕
            </button>
          </div>
        ))}

        {cartItems.length > 0 && (
          <div className="bag-footer">
            <div className="bag-total-row">
              <span>Total</span>
              <span className="bag-total-amount">PKR {cartTotal.toLocaleString()}</span>
            </div>
            <p className="cod-note">💳 Payment method: Cash on Delivery</p>
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              PROCEED TO CHECKOUT →
            </button>
            <button
              className="continue-shopping"
              onClick={() => navigate("/jewellery")}
            >
              ← Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Confirmation dialog — Error Prevention (Nielsen #5) */}
      {confirmRemove && (
        <div className="confirm-overlay" role="dialog" aria-modal="true" aria-label="Confirm removal">
          <div className="confirm-box">
            <p>Remove <strong>{confirmRemove.title}</strong> from your bag?</p>
            <div className="confirm-actions">
              <button className="confirm-yes" onClick={handleConfirmRemove}>Yes, Remove</button>
              <button className="confirm-no" onClick={() => setConfirmRemove(null)}>Keep It</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
