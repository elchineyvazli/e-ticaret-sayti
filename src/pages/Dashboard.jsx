import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaPhone, FaLock, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import '../styles/pages_styles/Dashboard.scss';

import ProfileSection from '../components/dashboard/ProfileSection';
import PhoneSection from '../components/dashboard/PhoneSection';
import PasswordSection from '../components/dashboard/PasswordSection';
import OrdersSection from '../components/dashboard/OrderSection';
import AddressSection from '../components/dashboard/AddressSection';

function Dashboard() {
    const [activeSection, setActiveSection] = useState('profile');
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const menuItems = [
        { key: 'profile', label: 'Profil', icon: <FaUser /> },
        { key: 'address', label: 'Adres Bilgilerim', icon: <FaPhone /> },
        { key: 'password', label: 'Şifrə Dəyiş', icon: <FaLock /> },
        { key: 'orders', label: 'Sifarişlər', icon: <FaShoppingBag /> },
        { key: 'logout', label: 'Çıxış', icon: <FaSignOutAlt /> },
    ];

    const handleMenuClick = (key) => {
        if (key === 'logout') {
            setShowLogoutConfirm(true); // Artık hemen çıkış değil, popup açıyoruz
        } else {
            setActiveSection(key);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const handleCancelLogout = () => {
        setShowLogoutConfirm(false);
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
                    {activeSection === 'profile' && <ProfileSection />}
                    {activeSection === 'address' && <AddressSection />}
                    {activeSection === 'password' && <PasswordSection />}
                    {activeSection === 'orders' && <OrdersSection />}
                </motion.div>
            </section>

            {/* Çıkış Onay Popup */}
            <AnimatePresence>
                {showLogoutConfirm && (
                    <motion.div
                        className="logout-popup-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="logout-popup"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <h3>Çıxış etmək istədiyinizə əminsinizmi?</h3>
                            <div className="popup-buttons">
                                <button className="cancel-btn" onClick={handleCancelLogout}>İptal Et</button>
                                <button className="confirm-btn" onClick={handleLogout}>Çıxışı Onayla</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Dashboard;
