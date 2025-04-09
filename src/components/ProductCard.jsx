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
    quantity = 1
}) {
    const dispatch = useDispatch()
    const products = useSelector(store => store.productSlice.products)

    const products_copy = [...products]

    useEffect(() => {
        // console.log("products");
        // console.log(products[id - 1].quantity);
        // console.log("products_copy");
        // console.log(products_copy[id - 1].quantity);
    },)
    console.log(products_copy);    

    const increase_quantity = (id) => {
        products_copy[id - 1].quantity += 1
    }

    const crease_quantity = (id) => {
        products_copy[id - 1].quantity -= 1
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
                            (products_copy[id - 1].quantity + 1) > 1 && <span className="fa fa-angle-left angle quantity-arrow1 quantity-arrow" onClick={() => crease_quantity(id)}></span>
                        }
                        <span id="qt" className="quantity-block"
                            style={{ fontSize: products_copy[id - 1].quantity < 9 ? "20px" : "16px" }}
                        >
                            {products_copy[id - 1].quantity + 1}
                        </span>
                        {
                            (products_copy[id - 1].quantity + 1) < 10 && <span className="fa fa-angle-right angle quantity-arrow2 quantity-arrow" onClick={() => increase_quantity(id)}></span>
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
                        onClick={() => dispatch(addToProductBasket([id, quantity]))}
                    >Səbətə əlavə et</button>
                </div>
            </div>
        </div >
    )
}

export default ProductCard