import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaLock, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import '../styles/pages_styles/Dashboard.scss';

function Dashboard() {
    const [activeSection, setActiveSection] = useState('profile');

    const menuItems = [
        { key: 'profile', label: 'Profil', icon: <FaUser /> },
        { key: 'phone', label: 'Telefon', icon: <FaPhone /> },
        { key: 'password', label: 'Şifrə Dəyiş', icon: <FaLock /> },
        { key: 'orders', label: 'Sifarişlər', icon: <FaShoppingBag /> },
        { key: 'logout', label: 'Çıxış', icon: <FaSignOutAlt /> },
    ];

    const handleMenuClick = (key) => {
        if (key === 'logout') {
            localStorage.removeItem('token');
            window.location.href = '/';
        } else {
            setActiveSection(key);
        }
    };

    return (
        <div className="dashboard-container">
            <aside className="dashboard-menu">
                {menuItems.map(item => (
                    <motion.div
                        key={item.key}
                        className={`menu-item ${activeSection === item.key ? 'active' : ''}`}
                        onClick={() => handleMenuClick(item.key)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="icon">{item.icon}</span>
                        <span className="label">{item.label}</span>
                    </motion.div>
                ))}
            </aside>

            <section className="dashboard-content">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="content-box"
                >
                    {activeSection === 'profile' && <h2>Profil məlumatları buraya gələcək.</h2>}
                    {activeSection === 'phone' && <h2>Telefon nömrəsi dəyişdirmək.</h2>}
                    {activeSection === 'password' && <h2>Şifrəni yeniləmək.</h2>}
                    {activeSection === 'orders' && <h2>Sifariş tarixçəsi.</h2>}
                </motion.div>
            </section>
        </div>
    );
}

export default Dashboard;