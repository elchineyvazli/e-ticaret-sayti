import { Route, Routes } from "react-router";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BasketProducts from './pages/BasketProducts';
import NothingPage from "./Error/NothingPage";
import Loading from "./components/Loading";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Popup from './components/Popup';
import AgreementModal from "./components/AgreementModal";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [agreementModalOpen, setAgreementModalOpen] = useState(false);
  const [onAgreementAccepted, setOnAgreementAccepted] = useState(null);

  // Açma fonksiyonu (isteğe bağlı bir butonla çağırabilirsin)
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Sözleşme popup'ını açan fonksiyon
  const openAgreementModal = (onAcceptCallback) => {
    setAgreementModalOpen(true);
    setOnAgreementAccepted(() => onAcceptCallback);
  };

  const handleAgreementAccept = () => {
    if (onAgreementAccepted) onAgreementAccepted();
    setAgreementModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/haqqimizda" element={<About />} />
          <Route path="/elaqe" element={<Contact />} />
          {/* Popup'ı tetiklemek için openPopup fonksiyonunu sayfaya gönderiyoruz */}
          <Route path="/product_basket" element={<BasketProducts openPopup={openPopup} />} />
          <Route path="*" element={<NothingPage />} />
        </Routes>
      </main>

      {/* Ana adım adım popup */}
      <Popup
        isOpen={isPopupOpen}
        closePopup={closePopup} // 🔁 Artık düzgün kapatılıyor
        openAgreementModal={openAgreementModal}
      />

      {/* Sözleşme popup'ı global */}
      <AgreementModal
        isOpen={agreementModalOpen}
        onClose={() => setAgreementModalOpen(false)}
        onAccept={handleAgreementAccept}
      />

      <Loading />
    </>
  );
}

export default App;
