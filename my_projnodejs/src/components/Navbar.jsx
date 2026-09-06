import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingBag, FaSearch, FaTimes, FaBars } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import AuthForm from "./AuthForm";
import UserMenu from "./UserMenu";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const categories = ["ring","bracelet","earring","necklace","casual","party wear","bridal"];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to load products for search:", err));
  }, []);

  // Live search suggestions — Nielsen Heuristic #6: Recognition over Recall
  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    const term = searchTerm.toLowerCase();
    const productMatches = products
      .filter(p => p.title.toLowerCase().includes(term))
      .slice(0, 4)
      .map(p => ({ label: p.title, type: "product" }));
    const catMatches = categories
      .filter(c => c.includes(term))
      .slice(0, 2)
      .map(c => ({ label: c.charAt(0).toUpperCase() + c.slice(1), type: "category" }));
    setSuggestions([...productMatches, ...catMatches]);
  }, [searchTerm, products]);

  const handleSearch = (term) => {
    const t = (term || searchTerm).trim().toLowerCase();
    if (!t) return;

    const foundProduct = products.find(p => p.title.toLowerCase() === t);
    const foundCategory = categories.find(c => c === t);

    if (foundProduct) {
      navigate(`/jewellery?time=${Date.now()}`, { state: { highlight: foundProduct.title } });
    } else if (foundCategory) {
      navigate(`/jewellery?time=${Date.now()}`, { state: { type: foundCategory.charAt(0).toUpperCase() + foundCategory.slice(1) } });
    } else {
      navigate("/not-found");
    }

    setSearchTerm("");
    setSuggestions([]);
    setMobileMenuOpen(false);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion.label.toLowerCase());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") { setSuggestions([]); setSearchTerm(""); }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        {/* SEARCH — left */}
        <div className="nav-left" ref={searchRef}>
          <div className="search-container">
            <FaSearch
              size={14}
              onClick={() => handleSearch()}
              style={{ cursor: "pointer", flexShrink: 0, minWidth: 14, minHeight: 14 }}
              aria-label="Search"
            />
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={() => setSearchFocused(true)}
              aria-label="Search products"
              aria-autocomplete="list"
              aria-expanded={suggestions.length > 0}
            />
            {searchTerm && (
              <FaTimes
                size={12}
                style={{ cursor: "pointer", opacity: 0.6, flexShrink: 0, minWidth: 12, minHeight: 12 }}
                onClick={() => { setSearchTerm(""); setSuggestions([]); }}
                aria-label="Clear search"
              />
            )}
            {/* Live suggestions dropdown */}
            {suggestions.length > 0 && (
              <ul className="search-suggestions" role="listbox">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    role="option"
                    onClick={() => handleSuggestionClick(s)}
                    className="suggestion-item"
                  >
                    <span className="suggestion-type">{s.type === "category" ? "📂" : "💍"}</span>
                    {s.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* BRAND + NAV links — center */}
        <div className="nav-center">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1>AUREA</h1>
          </Link>
          <ul className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
            <li><Link className="nav-link" to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link className="nav-link" to="/jewellery" onClick={() => setMobileMenuOpen(false)}>Jewellery</Link></li>
            <li><Link className="nav-link" to="/collections" onClick={() => setMobileMenuOpen(false)}>Collections</Link></li>
            <li><Link className="nav-link" to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
            <li><Link className="nav-link" to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>

        {/* RIGHT: user + bag + hamburger */}
        <div className="nav-right">
          <button
            className="icon-btn"
            onClick={() => setOpen(true)}
            aria-label={user ? "Account menu" : "Login or register"}
            title={user ? `Hello, ${user.name}` : "Login / Register"}
          >
            <FaUser size={18} />
            {user && <span className="user-dot" aria-hidden="true" />}
          </button>

          <Link
            to="/bag"
            className={`bag-icon ${totalItems > 0 ? "bag-full" : ""}`}
            aria-label={`Shopping bag, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          >
            <FaShoppingBag size={18} />
            {totalItems > 0 && <span aria-hidden="true">{totalItems}</span>}
          </Link>

          {/* Mobile hamburger */}
          <button
            className="hamburger"
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </nav>

      {/* AUTH MODAL */}
      {open && (
        <div className="auth-overlay" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Account">
          <div onClick={(e) => e.stopPropagation()}>
            {user ? <UserMenu onClose={() => setOpen(false)} /> : <AuthForm onClose={() => setOpen(false)} />}
          </div>
        </div>
      )}
    </>
  );
}
