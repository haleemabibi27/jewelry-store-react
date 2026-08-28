import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaTimes } from "react-icons/fa";

export default function AuthForm({ onClose }) {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!isLogin) {
      if (!form.name.trim()) newErrors.name = "Full name is required.";
      if (!form.phone.trim()) {
        newErrors.phone = "Phone number is required.";
      } else if (!/^\+?[0-9\s\-]{7,15}$/.test(form.phone)) {
        newErrors.phone = "Enter a valid phone number.";
      }
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (!isLogin && form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!isLogin) {
      if (!form.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
      } else if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    let response;
    if (isLogin) {
      response = await login(form.email, form.password);
    } else {
      response = await register(form.name, form.phone, form.email, form.password);
    }
    setLoading(false);
    if (response.success) {
      setStatusType("success");
      setStatus(isLogin ? "Welcome back! Logged in successfully." : "Account created successfully!");
      setForm({ name: "", phone: "", email: "", password: "", confirmPassword: "" });
      setTimeout(() => onClose && onClose(), 1200);
    } else {
      setStatusType("error");
      setStatus(response.message || "Something went wrong. Please try again.");
      setForm({ ...form, password: "", confirmPassword: "" });
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setStatus("");
    setErrors({});
  };

  return (
    <div className="auth-card" role="dialog" aria-label={isLogin ? "Login" : "Create Account"}>

      {onClose && (
        <button className="auth-close-btn" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
      )}

      <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>

      <form onSubmit={handleSubmit} noValidate>
        {!isLogin && (
          <>
            <div className="field-group">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                aria-label="Full Name"
                aria-invalid={!!errors.name}
                className={errors.name ? "field-error" : ""}
              />
              {errors.name && <span className="field-error-msg" role="alert">{errors.name}</span>}
            </div>

            <div className="field-group">
              <input
                name="phone"
                placeholder="Phone Number"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                aria-label="Phone Number"
                aria-invalid={!!errors.phone}
                className={errors.phone ? "field-error" : ""}
              />
              {errors.phone && <span className="field-error-msg" role="alert">{errors.phone}</span>}
            </div>
          </>
        )}

        <div className="field-group">
          <input
            name="email"
            placeholder="Email Address"
            type="email"
            value={form.email}
            onChange={handleChange}
            aria-label="Email Address"
            aria-invalid={!!errors.email}
            className={errors.email ? "field-error" : ""}
          />
          {errors.email && <span className="field-error-msg" role="alert">{errors.email}</span>}
        </div>

        <div className="field-group">
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            aria-label="Password"
            aria-invalid={!!errors.password}
            className={errors.password ? "field-error" : ""}
          />
          {errors.password && <span className="field-error-msg" role="alert">{errors.password}</span>}
        </div>

        {!isLogin && (
          <div className="field-group">
            <input
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              aria-label="Confirm Password"
              aria-invalid={!!errors.confirmPassword}
              className={errors.confirmPassword ? "field-error" : ""}
            />
            {errors.confirmPassword && <span className="field-error-msg" role="alert">{errors.confirmPassword}</span>}
          </div>
        )}

        <button type="submit" disabled={loading} className="auth-submit-btn">
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      {status && (
        <p
          className={`form-status ${statusType === "success" ? "status-success" : "status-error"}`}
          role="alert"
          aria-live="polite"
        >
          {status}
        </p>
      )}

      <p className="auth-switch">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span
          className="toggle-link"
          onClick={switchMode}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && switchMode()}
        >
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
    </div>
  );
}