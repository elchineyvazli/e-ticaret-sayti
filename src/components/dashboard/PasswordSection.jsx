import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock } from 'react-icons/fa';
import '../../styles/dashb_styles/PasswordSection.scss';

function PasswordSection() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (newPassword !== confirmPassword) {
            setError('❌ Yeni şifrələr uyğun deyil.');
            return;
        }

        if (newPassword.length < 6) {
            setError('❌ Şifrə ən az 6 simvol olmalıdır.');
            return;
        }

        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <motion.div
            className="info-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="card-title">
                <FaLock style={{ marginRight: "10px" }} />
                Şifrəni Dəyiş
            </div>
            <div className="card-body">
                <form onSubmit={handlePasswordUpdate} className="password-form">
                    <input
                        type="password"
                        placeholder="Köhnə şifrə"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Yeni şifrə"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Yeni şifrəni təsdiqlə"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Yenilə</button>
                </form>

                {success && <p className="success-message">✅ Şifrə uğurla yeniləndi!</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </motion.div>
    );
}

export default PasswordSection;
