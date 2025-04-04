import { Link } from 'react-router'
import '../styles/Navbar.scss'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { PiBasketLight } from "react-icons/pi";


function Navbar() {
    const totalServiceQuantity = useSelector(store => store.serviceSlice.totalServiceQuantity)
    const totalProductQuantity = useSelector(store => store.productSlice.totalProductQuantity)

    let [isShowBasket, setIsShowBasket] = useState(false)
    let [totalQuantity, setTotalQuantity] = useState(0)

    useEffect(() => {
        setTotalQuantity(totalProductQuantity + totalServiceQuantity)
    }, [totalServiceQuantity, totalProductQuantity])

    return (
        <nav>
            <Link className='link_homepage' to="/" >TGA</Link>
            <div className="links">
                <Link className='link' to="/preferences" >Preferences</Link>
                <Link className='link' to="/services" >Services</Link>
                <Link className='link' to="/products" >Products</Link>
                <div className='total_basket' onMouseEnter={() => setIsShowBasket(true)} onMouseLeave={() => setIsShowBasket(false)} >
                    {/* <PiBasketLight size={28} /> */}
                    <Link to="/" style={{ fontSize: "20px", textDecoration: "none" }}>🛒</Link>
                    <div className="count">{totalProductQuantity}</div>
                </div>
            </div >
        </nav >
    )
}

export default Navbar