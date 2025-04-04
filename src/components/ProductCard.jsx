import { useDispatch } from "react-redux"
import "../styles/ProductCard.scss"
import { useNavigate } from "react-router-dom"
import { addToProductBasket } from "../slices/productSlice"
import { useState } from "react"

function ProductCard({
    id,
    title,
    price,
    description,
    category,
    image,
    isDescShow = false,
    quantity = 1,
    isDetailShow = false,
    classCard
}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [prodCount, setProdCount] = useState(0)

    return (
        <>
            {/* <div className={classCard} >
                {
                    isDescShow &&
                    (
                        <>
                            {
                                isDetailShow && (
                                    <>
                                        <button className="detail_button" onClick={() => navigate('/product-detail/' + id)}>Detala yönləndir</button>
                                        <p></p>
                                    </>
                                )
                            }
                        </>
                    )
                }
            </div> */}

            <div class={classCard}>
                <div class="header">
                    <div class="back"></div>
                </div>
                <div class="main">
                    <div class="left">
                        <h1>category</h1>
                        <h2>title</h2>
                        <h3>₼{price}</h3>
                        <img src={image} alt="image" />
                    </div>
                    <div class="right">
                        <p>{description.slice(0, 100)}</p>
                        <p>
                            <span class="fa fa-star yellow"></span>
                            <span class="fa fa-star yellow"></span>
                            <span class="fa fa-star yellow"></span>
                            <span class="fa fa-star yellow"></span>
                            <span class="fa fa-star"></span>
                        </p>
                        <span>(4.67 - 172 reviews)</span>
                        <p class="quantity">ƏDƏD<span class="fa fa-angle-left angle" onClick={() => setProdCount(prev => prev - 1)}></span><span id="qt">{prodCount}</span><span class="fa fa-angle-right angle" onClick={() => setProdCount(prev => prev + 1)}></span></p>
                    </div>
                </div>
                <div class="footer">
                    <div class="left">
                        <p id="price">₼{price}</p>
                    </div>
                    <div class="right">
                        <button onClick={() => dispatch(addToProductBasket(id))}>Səbətə əlavə et</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard