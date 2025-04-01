import { Link } from 'react-router'
import { SlBasket } from "react-icons/sl";
import '../css/Navbar.css'
import { useSelector } from 'react-redux';


function Navbar() {
    const totalQuantity = useSelector(store => store.basketSlicer.totalQuantity)
    const products = useSelector(store => store.appSlicer.products)

    return (
        <nav>
            <h4>Logo</h4>
            <div className="links">
                <Link className='link' to="/" >Home</Link>
                <Link className='link' to="/preferences" >Preferences</Link>
                <Link className='link' to="/about" >About</Link>
                <Link className='link' to="/services" >Services</Link>
                <Link className='link' to="/products" >Products</Link>
                <Link className='link basket' to="/basket" >
                    <div className="count-container">
                        <SlBasket size={20} />
                        <div className="count">{totalQuantity}</div>
                    </div>
                </Link>
            </div>
        </nav >
    )
}

export default Navbar