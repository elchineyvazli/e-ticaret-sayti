import React, { useState } from 'react';
import '../../styles/StepPaymentType.scss';

const methods = [
    {
        id: 'card',
        name: 'Banka Kartı',
        icon: '💳',
        info: 'Kart məlumatlarınızı istifadə edərək ödəniş edə bilərsiniz.'
    },
    {
        id: 'transfer',
        name: 'Bank Köçürməsi',
        icon: '🏦',
        info: 'Bank hesabımıza köçürmə etməklə ödənişi tamamlayın.'
    },
    {
        id: 'wallet',
        name: 'Portmanat Balans',
        icon: '💰',
        info: 'Portmanat hesabınızdakı balansdan istifadə edərək ödəniş edin.'
    }
];

const StepPaymentType = ({ next, back }) => {
    const [selected, setSelected] = useState(null);

    const handleNext = () => {
        if (!selected) return;
        localStorage.setItem('paymentMethod', selected);
        next();
    };

    return (
        <div className="payment-container">
            <h2 className="payment-title">Ödəniş Metodunu Seç</h2>

            <div className="method-grid">
                {methods.map(method => (
                    <div
                        key={method.id}
                        className={`method-card ${selected === method.id ? 'selected' : ''}`}
                        onClick={() => setSelected(method.id)}
                    >
                        <div className="method-icon">{method.icon}</div>
                        <div className="method-name">{method.name}</div>
                    </div>
                ))}
            </div>

            {selected && (
                <div className="method-info">
                    {methods.find(m => m.id === selected)?.info}
                </div>
            )}

            <div className="button-group">
                <button className="btn secondary" onClick={back}>← Önceki</button>
                <button className="btn primary" onClick={handleNext}>Növbəti →</button>
            </div>
        </div>
    );
};

export default StepPaymentType;
