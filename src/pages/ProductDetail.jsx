import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import ProductCard from "../components/ProductCard";
import "../css/ProductDetail.css"

function ProductDetail() {
    const params = useParams();
    const products = useSelector(store => store.appSlicer.products)

    return (
        <div className="product-detail">
            {
                products && products.map(el => {
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
                            />
                        )
                    }
                })
            }
        </div>
    )
}

export default ProductDetail