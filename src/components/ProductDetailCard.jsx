import { useSelector } from "react-redux"
import '../styles/ProductDetailCard.scss'

function ProductDetailCard(
    {
        id,
        title,
        price,
        description,
        image,
        quality,
        total_quantity
    }
) {
    const products = useSelector(store => store.productSlice.products)

    return (
        <div className='productDetailCard'>
            <div className="header">
                <div className="back"></div>
            </div>
            <div className="main">
                <div className="left">
                    <img src={image} alt="image" />
                </div>
                <div className="right">
                    <h2 className="title">{title}</h2>
                    <p>{description.slice(0, 100)}</p>
                    <div className="stars">
                        {Array.from({ length: 5 }, (_, i) => (
                            <span
                                key={i}
                                className={`fa fa-star ${i < Math.round(quality) ? "yellow" : ""}`}
                            ></span>
                        ))}
                    </div>
                    <span>(4.67 - 172 reviews)</span>
                    <div className="quantity">
                        <span id="qt" className="quantity-block"
                            style={{ fontSize: products[id - 1].total_quantity < 10 ? "20px" : "16px" }}
                        >
                            {products[id - 1].total_quantity}
                        </span>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="left">
                    <p id="price">₼
                        {(price * (products[id - 1].total_quantity)).toFixed(2)}
                    </p>
                </div>
            </div>
        </div >
    )
}

export default ProductDetailCard