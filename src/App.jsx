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
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [agreementModalOpen, setAgreementModalOpen] = useState(false);
  const [onAgreementAccepted, setOnAgreementAccepted] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined") {
      axios.get("http://localhost:8000/api/auth/me/", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setUserData(res.data);

          if (res.data.popup && res.data.popup.step) {
            setIsPopupOpen(true);
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent("resumeStep", {
                detail: { step: res.data.popup.step }
              }));
            }, 500);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUserData(null);
        })
        .finally(() => {
          setIsAppLoading(false);
        });
    } else {
      setIsAppLoading(false);
    }
  }, []);

  if (isAppLoading) {
    return <Loading />;
  }

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
          <Route path="/login" element={<Login setUserData={setUserData} />} />
          <Route path="*" element={<NothingPage />} />
        </Routes>
      </main>

      {isPopupOpen && (
        <Popup
          closePopup={() => setIsPopupOpen(false)}
          openAgreementModal={(cb) => {
            setOnAgreementAccepted(() => cb);
            setAgreementModalOpen(true);
          }}
          initialStep={parseInt(localStorage.getItem('reopenStep')) || 1}
        />
      )}

      <AgreementModal
        isOpen={agreementModalOpen}
        onClose={() => setAgreementModalOpen(false)}
        onAccept={() => {
          if (onAgreementAccepted) onAgreementAccepted();
          setAgreementModalOpen(false);
        }}
      />
    </>
  );
}

export default App;
