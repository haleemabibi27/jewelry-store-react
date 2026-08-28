import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Navbar from "../components/Navbar";
import "../App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [msg, setMsg] = useState(""); // message for newsletter
  const navigate = useNavigate();

  // NEW ARRIVALS
  const arrivals = [
    { title: "Aurea T", desc: "Rings", img: "/images/ring1.jpeg", type: "Ring" },
    { title: "Heart", desc: "Necklaces", img: "/images/necklace1.jpeg", type: "Necklace" },
    { title: "White Pearl", desc: "Earrings", img: "/images/earring1.jpeg", type: "Earring" },
    { title: "Bangle T2", desc: "Bracelets", img: "/images/bracelet1.jpeg", type: "Bracelet" },
    { title: "Lavender", desc: "Rings", img: "/images/ring2.jpeg", type: "Ring" },
    { title: "Rose", desc: "Earrings", img: "/images/earring2.jpeg", type: "Earring" },
    { title: "Charm Bracelet", desc: "Bracelets", img: "/images/bracelet2.jpeg", type: "Bracelet" },
    { title: "Gold Pendant", desc: "Necklaces", img: "/images/necklace2.jpeg", type: "Necklace" }
  ];

  // CATEGORIES
  const categories = [
    { name: "Ring", img: "/images/ring one.jpeg" },
    { name: "Necklace", img: "/images/necklace one.jpeg" },
    { name: "Bracelet", img: "/images/bracelets.jpeg" },
    { name: "Earring", img: "/images/earrings.jpeg" },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index) => setCurrentSlide(index),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  const maxSlide = arrivals.length - 4;
  const progress = maxSlide > 0 ? (currentSlide / maxSlide) * 100 : 0;

  // Newsletter subscribe handler
  const handleSubscribe = async () => {
    if (!newsletterEmail) {
      setMsg("Please enter an email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Subscription failed");

      setMsg(data.message || "Subscribed successfully!");
      setNewsletterEmail("");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <img src="/images/hero.jpeg" className="hero-img" alt="Luxury jewellery" />
        <div className="hero-text">
          <h1>Discover Your Sparkle</h1>
          <p>Luxury jewellery crafted for timeless elegance.</p>
          <button onClick={() => navigate("/collections")}>EXPLORE COLLECTIONS</button>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <div className="section-header"><h2>New Arrivals</h2></div>
      <section className="new-arrivals-section container">
        <Slider ref={sliderRef} {...settings}>
          {arrivals.map((item, i) => (
            <div
              key={i}
              className="product-item"
              onClick={() => navigate("/jewellery", { state: { type: item.type, highlight: item.title } })}
              style={{ cursor: "pointer" }}
            >
              <div className="img-box"><img src={item.img} alt={item.title} /></div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </Slider>
        <div className="slider-nav">
          <button className="arrow-btn" onClick={() => sliderRef.current.slickPrev()}>‹</button>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }}/></div>
          <button className="arrow-btn" onClick={() => sliderRef.current.slickNext()}>›</button>
        </div>
      </section>

      {/* CATEGORIES */}
        <section className="section-wine">
          <div className="container">
            <h2
              style={{
                textAlign: "center",
                fontSize: "35px",
                marginBottom: "30px"
                
              }}
            >
              Shop by Category
            </h2>

            <div className="grid-layout">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className="category-card"
                  onClick={() =>
                    navigate("/jewellery", { state: { type: cat.name } })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <img src={cat.img} alt={cat.name} />
                  <div className="card-overlay">{cat.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <h2>Stay in Touch</h2>
        <p>Be the first to receive exclusive launches and offers.</p>
        <div className="newsletter-input">
          <input 
            type="email" 
            placeholder="Email Address"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
          />
          <button onClick={handleSubscribe}>SUBSCRIBE</button>
        </div>
        {msg && (
          <p style={{ color: "#F7E7CE", marginTop: "10px", textAlign: "center" }}>{msg}</p>
        )}
      </section>

      <footer>© 2025 AUREA JEWELLERY — CRAFTED WITH ELEGANCE</footer>
    </>
  );
}
