import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/Navbar.scss';
import { PiFediverseLogoDuotone } from 'react-icons/pi';

function Navbar() {
  const productQuantity = useSelector(store => store.productSlice.productQuantity);

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
      </div>
    </nav>
  );
}

export default Navbar;