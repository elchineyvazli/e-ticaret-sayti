import { useState } from 'react';
import StepMetroSelectV2 from './steps/StepMetroSelectV2';
import StepAgreement from './steps/StepAgreement';
// import StepGuide from './steps/StepGuide';
// import StepPaymentType from './steps/StepPaymentType';
// import StepProof from './steps/StepProof';
// import StepFinish from './steps/StepFinish';
import '../styles/Popup.scss';

const Popup = ({ isOpen, closePopup }) => {
    const [step, setStep] = useState(1);

    const goNext = () => setStep(prev => prev + 1);
    const goBack = () => setStep(prev => prev - 1);

    const renderStep = () => {
        switch (step) {
            case 1: return <StepMetroSelectV2 next={goNext} />;
            case 2: return <StepAgreement next={goNext} back={goBack} />;
            // case 3: return <StepGuide next={goNext} back={goBack} />;
            // case 4: return <StepPaymentType next={goNext} back={goBack} />;
            // case 5: return <StepProof next={goNext} back={goBack} />;
            // case 6: return <StepFinish close={closePopup} />;
            default: return null;
        }
    };

    if (!isOpen) return null;

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
