import { useDispatch, useSelector } from "react-redux"
import "../styles/ProductCard.scss"
import { addToProductBasket, creaseQuantityProd, increaseQuantityProd } from "../slices/productSlice"
import { useEffect, useState } from "react"

function ProductCard({
    id,
    title,
    price,
    description,
    category,
    image,
    classCard,
    quantity
}) {
    const dispatch = useDispatch()
    const products = useSelector(store => store.productSlice.products)

    const increaseQuantity = () => {
        if (prod.quantity < 10) {
            quantity += 1;
            dispatch(increaseQuantityProd(id))
        }
    }

    const creaseQuantity = () => {
        if (prod.quantity < 10) {
            quantity += 1;
            dispatch(creaseQuantityProd(id))
        }
    }

    return (
        <div className={classCard}>
            <div className="header">
                <div className="back"></div>
            </div>
            <div className="main">
                <div className="left">
                    <h1>category</h1>
                    <h2>title</h2>
                    <h3>₼{price}</h3>
                    <img src={image} alt="image" />
                </div>
                <div className="right">
                    <p>{description.slice(0, 100)}</p>
                    <p>
                        <span className="fa fa-star yellow"></span>
                        <span className="fa fa-star yellow"></span>
                        <span className="fa fa-star yellow"></span>
                        <span className="fa fa-star yellow"></span>
                        <span className="fa fa-star"></span>
                    </p>
                    <span>(4.67 - 172 reviews)</span>
                    <div className="quantity">ƏDƏD
                        {
                            (products[id - 1].quantity + 1) > 1 && <span className="fa fa-angle-left angle quantity-arrow1 quantity-arrow" onClick={creaseQuantity}></span>
                        }
                        <span id="qt" className="quantity-block"
                            style={{ fontSize: products[id - 1].quantity < 9 ? "20px" : "16px" }}
                        >
                            {products[id - 1].quantity + 1}
                        </span>
                        {
                            (products[id - 1].quantity + 1) < 10 && <span className="fa fa-angle-right angle quantity-arrow2 quantity-arrow" onClick={increaseQuantity}></span>
                        }
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="left">
                    <p id="price">₼
                        {(price * (products[id - 1].quantity + 1)).toFixed(2)}
                    </p>
                </div>
                <div className="right">
                    <button className="addToProductBasket"
                        onClick={() => dispatch(addToProductBasket([id, products[id - 1].quantity]))}
                    >Səbətə əlavə et</button>
                </div>
            </div>
        </div >
    )
}

export default ProductCard