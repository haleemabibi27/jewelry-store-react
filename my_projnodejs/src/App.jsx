import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Jewellery from "./pages/Jewellery";
import Bag from "./pages/Bag";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Collections from "./pages/Collections";
import NotFound from "./pages/NotFound";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jewellery" element={<Jewellery />} />
      <Route path="/bag" element={<Bag />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  );
}
