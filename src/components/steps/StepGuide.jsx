import React, { useState } from 'react';
import '../../styles/steps_styles/StepGuide.scss';

const steps = [
    {
        title: 'Addım 1: Banka Seçimi',
        desc: 'Ödəniş üçün istifadə edəcəyiniz bankı seçin.',
        icon: '🏦'
    },
    {
        title: 'Addım 2: Ödənişin Göndərilməsi',
        desc: 'Seçdiyiniz bankdan ödənişi həyata keçirin.',
        icon: '💳'
    },
    {
        title: 'Addım 3: Ödəniş Metodunu Seçin',
        desc: 'Portmanat, LeoBank və ya Papara ilə ödənişi davam etdirin.',
        icon: '✅'
    }
];


const StepGuide = ({ next, back }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            axios.patch("http://localhost:8000/api/users/popup/", {
                popup: { step: 2, metro: selectedMetroId }
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            next();
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        } else {
            back();
        }
    };

    const { title, desc, icon } = steps[currentStep];

    return (
        <div className="guide-container">
            <div className="guide-card">
                <div className="guide-icon">{icon}</div>
                <h3 className="guide-title">{title}</h3>
                <p className="guide-desc">{desc}</p>
                <div className="step-indicator">
                    {steps.map((_, idx) => (
                        <span key={idx} className={`dot ${idx === currentStep ? 'active' : ''}`}></span>
                    ))}
                </div>
            </div>

            {currentStep === 2 ? (
                <div className="payment-options">
                    <button className="payment-btn" onClick={() => {
                        localStorage.setItem("shouldReopenPopup", "true");
                        localStorage.setItem("reopenStep", "4");
                        next(4);
                        window.open('https://portmanat.az', '_blank');
                    }}>
                        Portmanat Balansı ilə → 💰
                    </button>
                    <button className="payment-btn" onClick={() => {
                        localStorage.setItem("shouldReopenPopup", "true");
                        localStorage.setItem("reopenStep", "4");
                        next(4);
                        window.open('https://leobank.az', '_blank');
                    }}>
                        LeoBank ilə → 🏦
                    </button>
                    <button className="payment-btn" onClick={() => {
                        localStorage.setItem("shouldReopenPopup", "true");
                        localStorage.setItem("reopenStep", "4");
                        next(4);
                        window.open('https://papara.com', '_blank');
                    }}>
                        Papara ilə → 📲
                    </button>
                </div>
            ) : (
                <div className="button-group">
                    <button className="btn secondary" onClick={handlePrevStep}>
                        {currentStep === 0 ? '← Əvvəlki Addım' : '← Geri'}
                    </button>
                    <button className="btn primary" onClick={handleNextStep}>
                        {currentStep === steps.length - 1 ? 'Növbəti →' : 'İrəli →'}
                    </button>
                </div>
            )}

        </div>
    );
};

export default StepGuide;
