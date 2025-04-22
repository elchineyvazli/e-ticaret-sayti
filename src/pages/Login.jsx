// ✅ Login.jsx (FIX'lenmiş sürüm)
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/pages_styles/Login.scss';

function Login() {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                    email,
                    password,
                });
                localStorage.setItem('token', res.data.access);
                setMessage('Giriş uğurlu! Əvvəlki səhifəyə qayıdın ✅');
                setTimeout(() => window.close(), 2000);
            } else {
                const res = await axios.post('http://localhost:8000/api/auth/register/', {
                    email,
                    phone,
                    password,
                });
                setMessage('Qeydiyyat uğurlu! Emailə göndərilən kod ilə təsdiqləyin ✉️');
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
                    <input
                        type="tel"
                        placeholder="Telefon"
                        value={phone}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) setPhone(val);
                        }}
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Şifrə"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{mode === 'login' ? 'Daxil ol' : 'Qeydiyyat'}</button>
                {message && <p className="success">{message}</p>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default Login;