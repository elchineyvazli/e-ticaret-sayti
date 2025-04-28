import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt } from 'react-icons/fa';
import '../../styles/dashb_styles/PhoneSection.scss';

function PhoneSection() {
    const [phone, setPhone] = useState("+994 50 123 45 67");
    const [newPhone, setNewPhone] = useState('');
    const [success, setSuccess] = useState(false);

    const handlePhoneUpdate = (e) => {
        e.preventDefault();
        if (newPhone.trim()) {
            setPhone(newPhone);
            setNewPhone('');
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
    };

    return (
        <motion.div
            className="info-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="card-title">
                <FaPhoneAlt style={{ marginRight: "10px" }} />
                Telefon nömrəsi
            </div>
            <div className="card-body">
                <p><strong>Hazırkı nömrə:</strong> {phone}</p>

                <form onSubmit={handlePhoneUpdate} className="phone-form">
                    <input
                        type="tel"
                        placeholder="Yeni nömrəni daxil et"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                    />
                    <button type="submit">Yenilə</button>
                </form>

                {success && <p className="success-message">✅ Telefon nömrəsi yeniləndi!</p>}
            </div>
        </motion.div>
    );
}

export default PhoneSection;
