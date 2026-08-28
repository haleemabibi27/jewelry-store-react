import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css"; 

export default function NotFound() {
  return (
    <>
      <Navbar />

      <div
        className="notfound-page"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#3B010B", // Deep wine background
          color: "#F2E5C6",      // Champagne text
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h1 style={{ fontSize: "8rem", margin: "0" }}>404</h1>
        <h2 style={{ fontSize: "2rem", margin: "20px 0" }}>
          Page Not Found
        </h2>
        <p style={{ marginBottom: "30px" }}>
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          style={{
            padding: "12px 30px",
            backgroundColor: "#F2E5C6", // Champagne button
            color: "#3B010B",            // Deep wine text
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
}
