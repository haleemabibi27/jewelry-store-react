import Navbar from "../components/Navbar";
import AddToBagForm from "../components/AddToBagForm";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";

// Shimmer card — Visibility of System Status (Nielsen #1)
function ShimmerCard() {
  return (
    <div className="catalog-item shimmer-card" aria-hidden="true">
      <div className="shimmer shimmer-img" />
      <div className="shimmer shimmer-text" />
      <div className="shimmer shimmer-price" />
      <div className="shimmer shimmer-btn" />
    </div>
  );
}

export default function Jewellery() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortFilter, setSortFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const types = ["All", "Ring", "Bracelet", "Earring", "Necklace", "Casual", "Party Wear", "Bridal"];

  useEffect(() => {
    if (location.state?.type) {
      setTypeFilter(location.state.type);
    } else if (!location.state?.highlight) {
      // No filter/search was passed in — this is a plain nav click, so reset
      setTypeFilter("All");
      setSortFilter("All");
    }
  }, [location.key]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load products right now. Please try again in a moment.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...products];
    const highlightProduct = location.state?.highlight || null;

    if (highlightProduct) {
      result = result.filter((item) => item.title === highlightProduct);
    } else if (typeFilter !== "All") {
      result = result.filter((item) => item.type === typeFilter);
    }

    if (sortFilter === "Price Low-High") result.sort((a, b) => a.numericPrice - b.numericPrice);
    if (sortFilter === "Price High-Low") result.sort((a, b) => b.numericPrice - a.numericPrice);
    if (sortFilter === "A-Z") result.sort((a, b) => a.title.localeCompare(b.title));
    if (sortFilter === "Z-A") result.sort((a, b) => b.title.localeCompare(a.title));

    setFilteredItems(result);
  }, [sortFilter, typeFilter, products, location.key]);

  const handleReset = () => {
    setSortFilter("All");
    setTypeFilter("All");
  };

  const activeFilters = sortFilter !== "All" || typeFilter !== "All";

  return (
    <>
      <Navbar />

      <div
        className="jewellery-page"
        style={{
          minHeight: "100vh",
          paddingTop: "140px",
          paddingBottom: "60px",
          background: "#3B010B",
          color: "#F2E5C6",
        }}
      >
        <div className="container">

          {/* Filter bar — Flexibility & Efficiency (Nielsen #7) */}
          <div className="catalog-filters">
            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
              <select
                onChange={(e) => setSortFilter(e.target.value)}
                value={sortFilter}
                aria-label="Sort products"
                style={{ background: "#F2E5C6", color: "#3B010B" }}
              >
                <option value="All">Sort By</option>
                <option value="Price Low-High">Price: Low → High</option>
                <option value="Price High-Low">Price: High → Low</option>
                <option value="A-Z">Title: A → Z</option>
                <option value="Z-A">Title: Z → A</option>
              </select>

              <select
                onChange={(e) => setTypeFilter(e.target.value)}
                value={typeFilter}
                aria-label="Filter by type"
                style={{ background: "#F2E5C6", color: "#3B010B" }}
              >
                {types.map((t) => (
                  <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>
                ))}
              </select>

              {/* Reset filters — User Control (Nielsen #3) */}
              {activeFilters && (
                <button
                  onClick={handleReset}
                  className="reset-filters-btn"
                  aria-label="Clear all filters"
                >
                  ✕ Clear Filters
                </button>
              )}
            </div>

            {/* Result count — Visibility of System Status (Nielsen #1) */}
            {!loading && !error && (
              <span style={{ fontSize: "14px", opacity: 0.8 }}>
                {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""} found
              </span>
            )}
          </div>

          {/* Loading — shimmer skeleton */}
          {loading && (
            <div className="catalog-grid" aria-label="Loading products" aria-busy="true">
              {[...Array(8)].map((_, i) => <ShimmerCard key={i} />)}
            </div>
          )}

          {/* Error state — Help Users Recover (Nielsen #9) */}
          {error && !loading && (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ color: "#FF9999", fontSize: "18px", marginBottom: "16px" }}>
                ⚠ {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                style={{ padding: "12px 30px", background: "#F2E5C6", color: "#3B010B", border: "none", borderRadius: "25px", fontWeight: 600, cursor: "pointer" }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filteredItems.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ fontSize: "48px" }}>💍</p>
              <p style={{ fontSize: "18px", marginBottom: "8px" }}>No items match your filters.</p>
              <p style={{ opacity: 0.7, marginBottom: "20px" }}>Try adjusting or clearing your filters.</p>
              <button className="reset-filters-btn" onClick={handleReset}>
                Show All Items
              </button>
            </div>
          )}

          {/* Product grid */}
          {!loading && !error && filteredItems.length > 0 && (
            <div className="catalog-grid">
              {filteredItems.map((item) => (
                <div
                  className="catalog-item"
                  key={item._id}
                  style={{ background: "#F2E5C6", color: "#3B010B" }}
                >
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <h4>{item.title}</h4>
                  <p className="item-type-badge">{item.type}</p>
                  <p>PKR {item.numericPrice?.toLocaleString()}</p>
                  <AddToBagForm product={item} />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}