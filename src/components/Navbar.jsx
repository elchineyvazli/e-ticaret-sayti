import { Link } from 'react-router'
import { useSelector } from 'react-redux';
import '../styles/Navbar.scss'

function Navbar() {
    const totalProductQuantity = useSelector(store => store.productSlice.totalProductQuantity)

    return (
        <nav>
            <Link className='link_homepage' to="/" >TGA</Link>
            <div className="links">
                <Link className='link' to="/preferences" >Kateqoriyalar</Link>
                <Link className='link' to="/products" >Products</Link>
                <div className='total_basket' >
                    <Link to="/product_basket" style={{ fontSize: "20px", textDecoration: "none" }}>🛒</Link>
                    <div className="count">{totalProductQuantity}</div>
                </div>
            </div >
        </nav >
    )
}

export default Navbar