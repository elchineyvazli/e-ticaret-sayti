import { useState, useEffect } from 'react';
import StepMetroSelectV2 from './steps/StepMetroSelectV2';
import StepAgreement from './steps/StepAgreement';
import StepGuide from './steps/StepGuide';
import StepProof from './steps/StepProof';
import StepFinish from './steps/StepFinish';
import '../styles/Popup.scss';

const Popup = ({ closePopup, openAgreementModal, initialStep = 1 }) => {
    const [step, setStep] = useState(initialStep);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goNext = () => {
        if (isTransitioning) return; // 👈 Çoklu tıklamayı engelle
        setIsTransitioning(true);   // 🔒 Kilitliyoruz

        setStep(prev => prev + 1);

        setTimeout(() => {
            setIsTransitioning(false); // 🔓 500ms sonra tekrar aç
        }, 500); // bu sürede UI geçiş animasyonunu da bitirir
    };
    const goBack = () => setStep(prev => prev - 1);

    const renderStep = () => {
        switch (step) {
            case 1: return <StepMetroSelectV2 next={goNext} />;
            case 2: return <StepAgreement next={goNext} back={goBack} openAgreementModal={openAgreementModal} />;
            case 3: return <StepGuide next={goNext} back={goBack} />;
            case 4: return <StepProof next={goNext} back={goBack} />;
            case 5: return <StepFinish close={closePopup} />;
            default: return null;
        }
    };

    // DEBUG: logla bakalım
    console.log("🔁 STEP:", step);

    return (
        <div className="popup-overlay">
            <div className="popup-modern">
                <button className="popup-close" onClick={closePopup}>✖</button>
                <div className="popup-body">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default Popup;
