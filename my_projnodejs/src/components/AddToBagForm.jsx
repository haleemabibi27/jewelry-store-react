import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function AddToBagForm({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const increase = () => setQty(prev => prev + 1);
  const decrease = () => setQty(prev => (prev > 1 ? prev - 1 : 1));

  const handleAdd = () => {
    addItem(product, qty);

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);

    setQty(1); // reset after adding
  };

  return (
    <div className="add-to-bag-wrapper">

      {/* Quantity selector */}
      <div className="qty-selector">
        <button onClick={decrease} aria-label="Decrease quantity">−</button>
        <span>{qty}</span>
        <button onClick={increase} aria-label="Increase quantity">+</button>
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        className={`add-to-bag-btn ${added ? "added-state" : ""}`}
        aria-label={`Add ${product.title} to bag`}
      >
        {added ? "✓ Added!" : "Add to Bag"}
      </button>

    </div>
  );
}