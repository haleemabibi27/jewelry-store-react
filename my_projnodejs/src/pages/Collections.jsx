import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Collections() {
  const navigate = useNavigate();

  const collections = [
    { name: "Bridal", img: "/images/bridal.jpg" },
    { name: "Party Wear", img: "/images/party.jpg" },
    { name: "Casual", img: "/images/casual.jpg" }
  ];

  return (
    <>
      <Navbar />

      <section className="collections-page">
        <h1 className="collections-title">Collections</h1>
        <div className="collection-circles">
          {collections.map((col) => (
            <div
              key={col.name}
              className="circle-card"
              onClick={() => navigate("/jewellery", { state: { type: col.name } })}
            >
              <img src={col.img} alt={col.name} />
              <p>{col.name}</p>
            </div>
          ))}
        </div>

        <div className="collections-text">
          <h2>Jewelry for Every Moment</h2>
          <p>
            Explore our carefully crafted collections: Bridal, Party Wear, and Casual jewelry to suit every occasion.
          </p>
        </div>
      </section>
    </>
  );
}
