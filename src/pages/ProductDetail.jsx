import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import ProductCard from "../components/ProductCard";
import "../styles/ProductDetail.scss"

function ProductDetail() {
    const params = useParams();
    const products_in_basket = useSelector(store => store.productSlice.products_in_basket)

    return (
        <div className="product-detail">
            {
                products_in_basket && products_in_basket.map(el => {
                    if (el.id == params.id) {
                        return (
                            <ProductCard
                                key={el.id}
                                id={el.id}
                                title={el.title}
                                price={el.price}
                                description={el.description}
                                category={el.category}
                                image={el.image}
                                isDescShow={true}
                                isDetailShow={false}
                                classCard="product_card_basket"
                            />
                        )
                    }
                })
            }
        </div>
    )
}

export default ProductDetail