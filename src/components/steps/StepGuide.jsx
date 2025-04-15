import React, { useState } from 'react';
import '../../styles/StepGuide.scss';

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
        title: 'Addım 3: Təsdiq və Bitirmə',
        desc: 'Ödəniş təsdiqləndikdən sonra sistemə bildirin.',
        icon: '✅'
    }
];

const StepGuide = ({ next, back }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
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

            <div className="button-group">
                <button className="btn secondary" onClick={handlePrevStep}>
                    {currentStep === 0 ? '← Əvvəlki Addım' : '← Geri'}
                </button>
                <button className="btn primary" onClick={handleNextStep}>
                    {currentStep === steps.length - 1 ? 'Növbəti →' : 'İrəli →'}
                </button>
            </div>
        </div>
    );
};

export default StepGuide;
