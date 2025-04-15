import { Route, Routes } from "react-router";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const shouldOpen = localStorage.getItem("shouldReopenPopup");
    const step = localStorage.getItem("reopenStep");

    if (shouldOpen === "true") {
      setIsPopupOpen(true);
      localStorage.removeItem("shouldReopenPopup");

      if (step) {
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent("resumeStep", {
              detail: { step: parseInt(step) }
            })
          );
          localStorage.removeItem("reopenStep");
        }, 500);
      }
    }
  }, []);


  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

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
          <Route path="/product_basket" element={<BasketProducts openPopup={openPopup} />} />
          <Route path="*" element={<NothingPage />} />
        </Routes>
      </main>

      {isPopupOpen && (
        <Popup
          closePopup={closePopup}
          openAgreementModal={openAgreementModal}
          initialStep={parseInt(localStorage.getItem('reopenStep')) || 1}
        />
      )}

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
