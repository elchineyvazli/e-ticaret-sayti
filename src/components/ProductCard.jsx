import { useDispatch } from "react-redux"
import "../styles/ProductCard.scss"
import { useNavigate } from "react-router-dom"
import { addToProductBasket } from "../slices/productSlice"

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

    return (
        <div className={classCard} >
            <img src={image} alt="image" />
            <h2 className="title" style={{ textAlign: "center", height: "70px" }}>{title}</h2>
            {
                isDescShow ?
                    (
                        <>
                            {
                                isDetailShow && (
                                    <>
                                        <button onClick={() => navigate('/product-detail/' + id)}>Detala yönləndir</button>
                                        <p>{quantity} ədəd</p>
                                    </>
                                )
                            }
                            <p className="description" style={{ textAlign: "center" }}>{description}</p>
                            <h3 className="price">{price}₼</h3>
                        </>
                    ) :
                    (
                        <button onClick={() => dispatch(addToProductBasket(id))}>Səbətə əlavə et</button>
                    )
            }
        </div>
    )
}

export default ProductCard