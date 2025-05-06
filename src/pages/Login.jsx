import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/pages_styles/Login.scss';

function Login({ setUserData }) {
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
            } else {
                if (password !== confirmPassword) {
                    setError("Şifrələr uyğun deyil.");
                    return;
                }

                const cleanPhone = phone.replace(/\D/g, '');
                if (cleanPhone.length !== 9) {
                    setError("Telefon nömrəsi 10 rəqəmli olmalıdır");
                    return;
                }

                const res = await axios.post('http://localhost:8000/api/auth/register/', {
                    username,
                    phone_number: `994${cleanPhone}`,
                    password,
                    confirm_password: confirmPassword
                });

                if (res.status === 201) {
                    setMessage(res.data.msg);
                }
            }
        } catch (err) {
            if (err.response) {
                if (err.response.data) {
                    setError(err.response.data.msg ||
                        err.response.data.detail ||
                        "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
                }
            } else {
                setError("Şəbəkə xətası. İnternet bağlantınızı yoxlayın.");
            }
            console.error("Registration error:", err);
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
                            placeholder="__-___-__-__"
                            value={phone}
                            onChange={(e) => {
                                let digits = e.target.value.replace(/\D/g, '').slice(0, 9);
                                let formatted = '';
                                if (digits.length > 0) formatted += digits.slice(0, 2);
                                if (digits.length >= 3) formatted += '-' + digits.slice(2, 5);
                                if (digits.length >= 6) formatted += '-' + digits.slice(5, 7);
                                if (digits.length >= 8) formatted += '-' + digits.slice(7, 9);
                                setPhone(formatted);

                                const prefix = digits.slice(0, 3);
                                const validPrefixes = ['50', '51', '10', '55', '99', '70', '77', '60'];
                                if (prefix.length === 2 && !validPrefixes.includes(prefix)) {
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
