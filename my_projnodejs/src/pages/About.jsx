import Navbar from "../components/Navbar";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section className="about-ref">
        <div className="about-ref-container">

          {/* LEFT VISUALS */}
          <div className="about-images">
            <div className="img-card img-top">
              <img
                src="/images/aboutring.jpg"
                alt="Gold ring jewelry detail"
              />
            </div>

            <div className="img-card img-center">
              <img
                src="/images/aboutpic.jpg"
                alt="AUREA fine jewelry necklace"
              />
            </div>

            <div className="img-card stats-card">
              <div className="stats-number">30,000+</div>
              <div className="stats-text">Happy Jewellery Customers</div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="about-content">
            <span className="about-label">WHO WE ARE</span>

            <h1>CRAFTED IN ELEGANCE</h1>

            <p>
              AUREA is a contemporary jewelry brand dedicated to timeless beauty
              and refined craftsmanship. Each piece is thoughtfully designed to
              complement both everyday moments and life’s most meaningful
              occasions.
            </p>

            <p>
              Our designs balance modern minimalism with classic luxury 
              jewelry meant to be worn with confidence and kept forever.
            </p>

            <button
              className="about-btn"
              onClick={() => navigate("/jewellery")}
            >
              EXPLORE JEWELLERY
            </button>
          </div>

        </div>
      </section>
    </>
  );
}