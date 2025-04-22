import { useState } from 'react';
import axios from 'axios';
import '../styles/pages_styles/Login.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/auth/login/', { email, password });
            localStorage.setItem('token', res.data.access);
            setSuccess(true);
            setTimeout(() => {
                window.close(); // sekmeyi kapat
            }, 2000);
        } catch (err) {
            setError('Email və ya şifrə yanlışdır.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleLogin}>
                <h2>Giriş et</h2>
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
                <button type="submit">Daxil ol</button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">Giriş uğurlu! Əvvəlki səhifəyə qayıdın ✅</p>}
            </form>
        </div>
    );
}

export default Login;
