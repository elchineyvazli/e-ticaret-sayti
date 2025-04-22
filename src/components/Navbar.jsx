import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PiFediverseLogoDuotone } from 'react-icons/pi';
import { FaUser } from 'react-icons/fa';
import '../styles/comp_styles/Navbar.scss';
import { useEffect, useState, useRef } from 'react';

function Navbar() {
  const productQuantity = useSelector(store => store.productSlice.productQuantity);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userIconRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // ileride kullanıcı resmi vs. için kullanılabilir
    }
  }, []);

  return (
    <nav>
      <PiFediverseLogoDuotone size={30} color="#2d7a5f" />
      <div className="links">
        <Link className='link' to="/">Ana səhifə</Link>
        <Link className='link' to="/haqqimizda">Haqqımızda</Link>
        <Link className='link' to="/elaqe">Əlaqə</Link>

        <div className='total_basket'>
          <Link to="/product_basket" style={{ fontSize: "20px", textDecoration: "none" }}>🛒</Link>
          <div className="count">{productQuantity}</div>
        </div>

        <div className="user-icon-wrapper" ref={userIconRef}>
          <FaUser className="user-icon" onClick={toggleDropdown} />
          {dropdownOpen && (
            <div className="user-dropdown">
              <div className="triangle" />
              <Link
                to="/login"
                target="_blank"
                className="dropdown-link"
                onClick={() => localStorage.setItem("auth_mode", "login")}
              >
                🔑 Giriş
              </Link>
              <Link
                to="/login"
                target="_blank"
                className="dropdown-link"
                onClick={() => localStorage.setItem("auth_mode", "register")}
              >
                📝 Qeydiyyat
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;