import { Link } from 'react-router'
import { useSelector } from 'react-redux';
import '../styles/Navbar.scss'

function Navbar() {
    const productQuantity = useSelector(store => store.productSlice.productQuantity)

    return (
        <nav>
            <Link className='link_homepage' to="/" >TGA</Link>
            <div className="links">
                <Link className='link' to="/preferences" >Kateqoriyalar</Link>
                <Link className='link' to="/products" >Məhsullar</Link>
                <div className='total_basket' >
                    <Link to="/product_basket" style={{ fontSize: "20px", textDecoration: "none" }}>🛒</Link>
                    <div className="count">{productQuantity}</div>
                </div>
            </div >
        </nav >
    )
}

export default Navbar