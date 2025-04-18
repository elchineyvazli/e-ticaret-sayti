// StepProof.jsx (GÜNCELLENMİŞ VE TAM UYUMLU)
import { useState } from 'react';
import { logEvent } from '../../data/logSystem';
import '../../styles/StepProof.scss';
import '../../styles/mobile/StepProofMobile.scss';

const StepProof = ({ next, back }) => {
    const [file, setFile] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setShowPopup(true);
    };

    const confirmAndSubmit = () => {
        if (!file) return;
        logEvent('screenshot_uploaded', {
            filename: file.name,
            orderId: localStorage.getItem('currentOrderId') || 'unknown'
        });

        setShowPopup(false);
        setTimeout(() => {
            setSubmitted(true);
            setTimeout(() => {
                next();
            }, 1500);
        }, 1000);
    };

    return (
        <div className="proof-container">
            <h2 className="proof-title">Ödənişi Təsdiqləyin</h2>

            {!submitted ? (
                <>
                    <label className="upload-box">
                        {file ? (
                            <p className="file-name">📎 {file.name}</p>
                        ) : (
                            <p>📷 Ödəməyə dair screenshot yükləyin</p>
                        )}
                        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
                    </label>

                    <div className="button-group">
                        <button className="btn secondary" onClick={back}>← Önceki</button>
                        <button className="btn primary" onClick={() => file && setShowPopup(true)} disabled={!file}>Göndər</button>
                    </div>
                </>
            ) : (
                <div className="confirmation">
                    <div className="check-icon">✅</div>
                    <p>Ödəniş uğurla göndərildi!</p>
                </div>
            )}

            {/* Doğruluğu Onaylama Popupı */}
            {showPopup && file && (
                <div className="popup-overlay">
                    <div className="popup-window horizontal">
                        <div className="popup-image-section">
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Ön izleme"
                                className="preview-image"
                            />
                        </div>

                        <div className="popup-content">
                            <h3>Yüklədiyiniz screenshotı yoxlayın</h3>
                            <p className="warning-text">
                                ⚠️ Yanlış foto yükləmək hüquqi məsuliyyət yarada bilər. Doğruluğundan əminsinizmi?
                            </p>
                            <div className="popup-buttons">
                                <button className="btn confirm" onClick={confirmAndSubmit}>Onayla və Göndər</button>
                                <button className="btn secondary" onClick={() => setShowPopup(false)}>İmtina</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="chat-widget">
                <div className="chat-balloon">
                    <p>Salam! Ödənişlə bağlı sualınız varsa burdayıq.</p>
                </div>
                <div className="chat-label">💬 Canlı Dəstək</div>
            </div>
        </div>
    );
};

export default StepProof;