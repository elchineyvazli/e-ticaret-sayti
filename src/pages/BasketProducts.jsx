import ProductCard from '../components/ProductCard'
import { useSelector } from 'react-redux'
import '../styles/BasketProducts.scss'

function BasketProducts() {

    const products_in_basket = useSelector(store => store.productSlice.products_in_basket)
    for (let i = 0; i < products_in_basket.length; i++) {
    }


    return (
        <div className='product_basket'>
            {
                products_in_basket.length > 0 ? products_in_basket.map((el) => {

                    if (el.quantity != 0) {
                        return (
                            <ProductCard
                                key={el.id}
                                id={el.id}
                                title={el.name}
                                price={el.price}
                                description={el.description}
                                category={el.category}
                                image={el.image}
                                isDescShow={true}
                                quantity={el.quantity}
                                isDetailShow={true}
                                classCard='product_card'
                            />
                        )
                    } else {
                        return null
                    }
                }) : <h1>This page is empty</h1>
            }
        </div>
    )
}

export default BasketProducts