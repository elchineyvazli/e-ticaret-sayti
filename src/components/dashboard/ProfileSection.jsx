import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaUserAlt, FaCalendarAlt, FaEnvelope,
    FaPhoneAlt, FaShieldAlt, FaHandHoldingUsd,
    FaCreditCard, FaShoppingBag, FaArrowLeft,
    FaMobileAlt
} from 'react-icons/fa';
import '../../styles/dashb_styles/ProfileSection.scss';

function ProfileSection() {
    const [editingField, setEditingField] = useState(null);
    const [formData, setFormData] = useState({
        username: 'elchineyvazli',
        email: 'elchin@example.com',
        phone: '+994 50 123 45 67',
        paymentMethod: 'Portmanat',
    });

    const [inputValidation, setInputValidation] = useState({
        username: true,
        email: true,
        phone: true,
    });

    const availablePaymentMethods = ['Portmanat', 'LeoBank', 'Birbank'];

    useEffect(() => {
        if (editingField === 'username') {
            const isValid = formData.username.length > 3 && !formData.username.includes(' ');
            setInputValidation(prev => ({ ...prev, username: isValid }));
        }
        if (editingField === 'email') {
            const isValid = formData.email.includes('@');
            setInputValidation(prev => ({ ...prev, email: isValid }));
        }
    }, [formData.username, formData.email, editingField]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = (field) => {
        if (inputValidation[field]) {
            setEditingField(null);
            // burada backend'e güncelleme isteği atılabilir ✅
        } else {
            const el = document.getElementById(field);
            el.classList.add('shake');
            setTimeout(() => el.classList.remove('shake'), 500);
        }
    };

    return (
        <motion.div className="profile-section-container"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>

            <h2 className="profile-title">Profil Məlumatları</h2>

            <div className="profile-grid">

                {/* İstifadəçi adı */}
                <div className="profile-card">
                    <FaUserAlt className="icon" />
                    {editingField === 'username' ? (
                        <div className="editable">
                            <input id="username"
                                value={formData.username}
                                onChange={(e) => handleChange('username', e.target.value)}
                                className={inputValidation.username ? '' : 'invalid'}
                            />
                            <button className="save-button" onClick={() => handleSave('username')}>✔</button>
                        </div>
                    ) : (
                        <div className="text">
                            <label>İstifadəçi adı</label>
                            <p>{formData.username}</p>
                            <button className="edit-button" onClick={() => setEditingField('username')}>Dəyiş</button>
                        </div>
                    )}
                </div>

                {/* Qeydiyyat tarixi */}
                <div className="profile-card">
                    <FaCalendarAlt className="icon" />
                    <div className="text">
                        <label>Qeydiyyat tarixi</label>
                        <p>25 Aprel 2025</p>
                    </div>
                </div>

                {/* Email */}
                <div className="profile-card">
                    <FaEnvelope className="icon" />
                    {editingField === 'email' ? (
                        <div className="editable">
                            <input id="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className={inputValidation.email ? '' : 'invalid'}
                            />
                            <button className="save-button" onClick={() => handleSave('email')}>✔</button>
                        </div>
                    ) : (
                        <div className="text">
                            <label>E-mail</label>
                            <p>{formData.email}</p>
                            <button className="edit-button" onClick={() => setEditingField('email')}>Dəyiş</button>
                        </div>
                    )}
                </div>

                {/* Telefon */}
                <div className="profile-card">
                    <FaPhoneAlt className="icon" />
                    {editingField === 'phone' ? (
                        <div className="editable">
                            <input id="phone"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                            />
                            <div className="phone-actions">
                                <button className="confirm-button">Kodu Al</button>
                                <button className="cancel-button" onClick={() => setEditingField(null)}><FaArrowLeft /></button>
                            </div>
                        </div>
                    ) : (
                        <div className="text">
                            <label>Telefon</label>
                            <p>{formData.phone}</p>
                            <button className="edit-button" onClick={() => setEditingField('phone')}>Dəyiş</button>
                        </div>
                    )}
                </div>

                {/* Təhlükəsizlik */}
                <div className="profile-card">
                    <FaShieldAlt className="icon" />
                    <div className="text">
                        <label>Təhlükəsizlik səviyyəsi</label>
                        <p>Yüksək</p>
                    </div>
                </div>

                {/* Destek bağışı */}
                <div className="profile-card">
                    <FaHandHoldingUsd className="icon" />
                    <div className="text">
                        <label>Destek Bağışınız</label>
                        <p>150 AZN</p>
                    </div>
                </div>

                {/* Ödəniş metodu seçimi */}
                <div className="profile-card">
                    <FaCreditCard className="icon" />
                    <div className="text payment-selector">
                        <label>Varsayılan Ödəniş</label>
                        <select
                            value={formData.paymentMethod}
                            onChange={(e) => handleChange('paymentMethod', e.target.value)}>
                            {availablePaymentMethods.map(method => (
                                <option key={method} value={method}>{method}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Sipariş sayı */}
                <div className="profile-card">
                    <FaShoppingBag className="icon" />
                    <div className="text">
                        <label>Sifariş sayı</label>
                        <p>13</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ProfileSection;
