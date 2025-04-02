import React from 'react'
import ProductCard from '../components/ProductCard'
import { useSelector } from 'react-redux'

function BasketProducts() {

    const products = useSelector(store => store.productSlice.products)

    return (
        <div>
            {
                products > 0 ? products.map((el) => {

                    if (el.quantity != 0) {
                        return (
                            <ProductCard
                                key={el.id}
                                id={el.id}
                                name={el.name}
                                price={el.price}
                                desc={el.description}
                                isDescShow={true}
                                quantity={el.quantity}
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