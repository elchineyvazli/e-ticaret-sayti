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
import Login from "./pages/Login";
import axios from "axios";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [agreementModalOpen, setAgreementModalOpen] = useState(false);
  const [onAgreementAccepted, setOnAgreementAccepted] = useState(null);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    const shouldOpen = localStorage.getItem("shouldReopenPopup");
    const step = localStorage.getItem("reopenStep");
    const token = localStorage.getItem("token");

    if (token && token !== "undefined" && token !== "null") {
      axios.get("http://localhost:8000/api/auth/me/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => setUserData(res.data))
        .catch((err) => {
          console.error("Giriş yoxdu və ya token səhvdi ❌", err);
          localStorage.removeItem("token");
          setUserData(null);
        });
    }

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
      <Navbar userData={userData} setUserData={setUserData} />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/haqqimizda" element={<About />} />
          <Route path="/elaqe" element={<Contact />} />
          <Route path="/product_basket" element={<BasketProducts openPopup={openPopup} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NothingPage />} />
          <Route path="/login" element={<Login setUserData={setUserData} />} />
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
