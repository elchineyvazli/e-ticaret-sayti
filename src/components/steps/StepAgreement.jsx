import { useState } from 'react';
import '../../styles/StepAgreement.scss';


const StepAgreement = ({ next, back, openAgreementModal }) => {
    const [mainChecked, setMainChecked] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleMainToggleClick = () => {
        if (!mainChecked) {
            openAgreementModal(() => setMainChecked(true));
        } else {
            setMainChecked(false);
        }
    };

    const handleNext = () => {
        if (!mainChecked) {
            setShowError(true);
            return;
        }
        setShowError(false);
        next();
    };

    return (
        <div className="agreement-container">
            <h2 className="agreement-title">Ödəniş Şərtləri</h2>

            <div className="toggle-wrapper" onClick={handleMainToggleClick}>
                <label className="switch">
                    <input type="checkbox" checked={mainChecked} readOnly />
                    <span className="slider"></span>
                </label>
                <span className="toggle-label">Ödəniş şərtlərini qəbul edirəm</span>
            </div>

            {showError && (
                <div className="error-message">Lütfən şərtləri qəbul edin.</div>
            )}

            <div className="button-group">
                <button className="btn secondary" onClick={back}>← Önceki</button>
                <button className="btn primary" onClick={handleNext}>Növbəti →</button>
            </div>
        </div>
    );
};



export default StepAgreement;
