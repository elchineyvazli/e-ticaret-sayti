import { Route, Routes } from "react-router";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BasketProducts from './pages/BasketProducts';
import NothingPage from "./Error/NothingPage";
import Loading from "./components/Loading";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Popup from './components/Popup'; // Popup bileşenini dahil ediyoruz

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup durumunu yönetmek için state

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/haqqimizda" element={<About />} />
          <Route path="/elaqe" element={<Contact />} />
          <Route path="/product_basket" element={<BasketProducts openPopup={openPopup} />} />
          <Route path="*" element={<NothingPage />} />
        </Routes>
      </main>

      <Popup isOpen={isPopupOpen} closePopup={closePopup} />

      <Loading />
    </>
  );
}

export default App;
