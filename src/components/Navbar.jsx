import { Link } from 'react-router'
import { SlBasket } from "react-icons/sl";
import '../css/Navbar.css'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


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
            <h4>Logo</h4>
            <div className="links">
                <Link className='link' to="/" >Home</Link>
                <Link className='link' to="/preferences" >Preferences</Link>
                <Link className='link' to="/about" >About</Link>
                <Link className='link' to="/services" >Services</Link>
                <Link className='link' to="/products" >Products</Link>
                <div className='total_basket' onMouseEnter={() => setIsShowBasket(true)} onMouseLeave={() => setIsShowBasket(false)} >
                    <p id='basket_link'>Basket</p>
                    {
                        isShowBasket && (
                            <div className='other_basket'>
                                <div className="list_basket">
                                    Total count
                                    <div className="count">{totalQuantity}</div>
                                </div>
                                <Link className='link list_basket' to="/product_basket" >
                                    Products
                                    <div className="count">{totalProductQuantity}</div>
                                </Link>
                                <Link className='link list_basket' to="/service_basket" >
                                    Services
                                    <div className="count">{totalServiceQuantity}</div>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div >
        </nav >
    )
}

export default Navbar