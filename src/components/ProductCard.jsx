import { useDispatch } from "react-redux"
import "../css/ProductCard.css"
import { useNavigate } from "react-router-dom"
import { addToProductBasket } from "../slices/productSlice"

function ProductCard({ id, title, price, description, category, image, isDescShow = false, quantity = 1 }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div className='product_card'>
            <img src={image} alt="image" />
            <h2 className="title">{title}</h2>
            {
                isDescShow ?
                    (
                        <>
                            <button onClick={() => navigate('/product-detail/' + id)}>Go to detail</button>
                            <p className="description" style={{ textAlign: "center" }}>{description}</p>
                            <h3 className="price">{price}₼</h3>
                            <p>quantity : {quantity}</p>
                        </>
                    ) :
                    (
                        <button onClick={() => dispatch(addToProductBasket(id))}>Add to cart</button>
                    )
            }
        </div>
    )
}

export default ProductCard