// AgreementModal.jsx (GLOBAL SÖZLƏŞMƏ MODALI)
import React, { useState } from 'react';
import '../styles/AgreementModal.scss';

const AgreementModal = ({ isOpen, onClose, onAccept }) => {
    const [innerChecked, setInnerChecked] = useState(false);

    const handleAccept = () => {
        if (innerChecked) {
            onAccept();
            setInnerChecked(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="agreement-modal-overlay">
            <div className="agreement-modal-window">
                <h3>Sözləşmə Şərtləri</h3>
                <ul className="terms-list">
                    <li>✔️ Ödəniş geri qaytarılmır.</li>
                    <li>✔️ Doğru məlumat verdiyinizə görə məsuliyyət daşıyırsınız.</li>
                    <li>✔️ Yanlış ödəniş mübahisələrində biz sənədləri təqdim edirik.</li>
                </ul>

                <div className="toggle-wrapper">
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={innerChecked}
                            onChange={() => setInnerChecked(!innerChecked)}
                        />
                        <span className="slider"></span>
                    </label>
                    <span className="toggle-label">
                        Yuxarıdakı şərtləri oxudum və qəbul edirəm
                    </span>
                </div>

                <div className="modal-buttons">
                    <button className="btn confirm" onClick={handleAccept} disabled={!innerChecked}>
                        Qəbul Et
                    </button>
                    <button className="btn secondary" onClick={() => {
                        setInnerChecked(false);
                        onClose();
                    }}>
                        İmtina
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgreementModal;
