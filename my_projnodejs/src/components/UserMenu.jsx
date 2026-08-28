import { useAuth } from "../context/AuthContext";
import { FaTimes } from "react-icons/fa";

export default function UserMenu({ onClose }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose && onClose();
  };

  return (
    <div className="auth-card">
      {onClose && (
        <button className="auth-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
      )}
      <h2>Hello, {user.name} 👋</h2>
      <p style={{ opacity: 0.75, marginBottom: "20px" }}>{user.email}</p>
      <button onClick={handleLogout} style={{ width: "100%", padding: "12px", background: "#3B010B", color: "#F2E5C6", border: "none", borderRadius: "25px", fontWeight: 600, cursor: "pointer" }}>
        Logout
      </button>
    </div>
  );
}
