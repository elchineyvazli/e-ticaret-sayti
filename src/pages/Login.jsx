import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/pages_styles/Login.scss';

function Login() {
    const [mode, setMode] = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const savedMode = localStorage.getItem('auth_mode');
        if (savedMode) setMode(savedMode);
    }, []);

    const switchMode = (target) => {
        setMode(target);
        localStorage.setItem('auth_mode', target);
        setMessage('');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            if (mode === 'login') {
                const res = await axios.post('http://localhost:8000/api/auth/login/', {
                    username,
                    password,
                });
                localStorage.setItem('token', res.data.access);
                setMessage('Giriş uğurlu! Əvvəlki səhifəyə qayıdın ✅');

                // Yeni: Ana sekme kapalı mı kontrolü
                if (!window.opener || window.opener.closed) {
                    // Ana sekme kapalıysa yeni sekme aç
                    window.open("http://localhost:5173", "_blank");
                }

                // 2 saniye sonra popup'u kapat
                setTimeout(() => window.close(), 2000);

            } else {
                if (password !== confirmPassword) {
                    setError("Şifrələr uyğun deyil.");
                    return;
                } else {
                    const res = await axios.post('http://localhost:8000/api/auth/register/', {
                        username,
                        phone_number: phone,
                        password,
                    });
                    setMessage('Qeydiyyat uğurlu! WhatsApp nömrənizə kod göndərildi ✅');
                }
            }
        } catch (err) {
            if (err.response?.data) {
                setError(Object.values(err.response.data).flat().join(" | "));
            } else {
                setError("Xəta baş verdi. Məlumatları yoxlayın.");
            }
            console.error("❌ Register/Login API ERROR:", err);
        }
    };


    return (
        <div className="login-container">
            <div className="switcher">
                <button
                    className={mode === 'login' ? 'active' : ''}
                    onClick={() => switchMode('login')}
                >
                    Giriş
                </button>
                <button
                    className={mode === 'register' ? 'active' : ''}
                    onClick={() => switchMode('register')}
                >
                    Qeydiyyat
                </button>
            </div>

            <form className="login-card" onSubmit={handleSubmit}>
                <h2>{mode === 'login' ? 'Giriş' : 'Qeydiyyat'}</h2>

                {mode === 'register' && (
                    <div className="phone-input-wrapper">
                        <span className="phone-prefix">🇦🇿 +994</span>
                        <input
                            type="tel"
                            placeholder="___-___-__-__"
                            value={phone}
                            onChange={(e) => {
                                let digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                                let formatted = '';
                                if (digits.length > 0) formatted += digits.slice(0, 3);
                                if (digits.length >= 4) formatted += '-' + digits.slice(3, 6);
                                if (digits.length >= 7) formatted += '-' + digits.slice(6, 8);
                                if (digits.length >= 9) formatted += '-' + digits.slice(8, 10);
                                setPhone(formatted);

                                const prefix = digits.slice(0, 3);
                                const validPrefixes = ['050', '051', '010', '055', '099', '070', '077', '060'];
                                if (prefix.length === 3 && !validPrefixes.includes(prefix)) {
                                    setError("Prefiks yanlışdır. Zəhmət olmasa düzgün operator kodu daxil edin.");
                                } else {
                                    setError("");
                                }
                            }}
                            required
                        />
                    </div>
                )}

                <input
                    type="text"
                    placeholder="İstifadəçi adı"
                    value={username}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^[a-zA-Z0-9_]*$/.test(val)) setUsername(val);
                    }}
                    required
                />

                <input
                    type="password"
                    placeholder="Şifrə"
                    value={password}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^[a-zA-Z0-9_]*$/.test(val)) setPassword(val);
                    }}
                    required
                />

                {mode === 'register' && (
                    <input
                        type="password"
                        placeholder="Şifrəni təsdiqlə"
                        value={confirmPassword}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^[a-zA-Z0-9_]*$/.test(val)) setConfirmPassword(val);
                        }}
                        required
                    />
                )}

                <button type="submit">{mode === 'login' ? 'Daxil ol' : 'Qeydiyyatdan keç'}</button>
                {message && <p className="success">{message}</p>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default Login;
