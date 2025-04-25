import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PiFediverseLogoDuotone } from 'react-icons/pi';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../styles/comp_styles/Navbar.scss';
import { MdLogout, MdDashboard } from 'react-icons/md';
import { FaUserAstronaut, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

function Navbar({ userData, setUserData }) {
  const productQuantity = useSelector(store => store.productSlice.productQuantity);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userIconRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://localhost:8000/api/auth/me/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setUserData(res.data))
      .catch(() => setUserData(null));
  }, [setUserData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserData(null);
    window.location.reload();
  };

  const renderUserVisual = () => {
    if (!userData?.username) return <FaUserAstronaut className="user-icon" onClick={toggleDropdown} />;
    const initials = userData.username.slice(0, 2).toUpperCase();
    return (
      <div className="initials-avatar" onClick={toggleDropdown}>
        {initials}
      </div>
    );
  };

  return (
    <nav className="navbar">
      <PiFediverseLogoDuotone size={30} color="#2d7a5f" className="logo-icon" />
      <div className="links">
        <Link className='link' to="/">Ana səhifə</Link>
        <Link className='link' to="/haqqimizda">Haqqımızda</Link>
        <Link className='link' to="/elaqe">Əlaqə</Link>

        <div className='total_basket'>
          <Link to="/product_basket" className="basket-link">🛒</Link>
          <div className="count">{productQuantity}</div>
        </div>

        <div className="user-icon-wrapper" ref={userIconRef}>
          {renderUserVisual()}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                className="user-dropdown"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="triangle" />
                {userData ? (
                  <>
                    <div className="dropdown-user">👋 {userData.username}</div>
                    <Link to="/dashboard" className="dropdown-link">
                      <MdDashboard /> <span>Dashboard</span>
                    </Link>
                    <button className="dropdown-link" onClick={handleLogout}>
                      <MdLogout /> <span>Çıxış</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      target="_blank"
                      className="dropdown-link"
                      onClick={() => localStorage.setItem("auth_mode", "login")}
                    >
                      <FaSignInAlt /> <span>Giriş</span>
                    </Link>
                    <Link
                      to="/login"
                      target="_blank"
                      className="dropdown-link"
                      onClick={() => localStorage.setItem("auth_mode", "register")}
                    >
                      <FaUserPlus /> <span>Qeydiyyat</span>
                    </Link>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
