import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../slices/productSlice'
import ProductCard from '../components/ProductCard'
import '../styles/Home.scss'

function Home() {
    const dispatch = useDispatch()
    const products = useSelector(store => store.productSlice.products)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
    return (
        <div className='product_list'>
            {
                products.map(prod => (
                    <ProductCard
                        key={prod.id}
                        id={prod.id}
                        image={prod.image}
                        title={prod.title}
                        description={prod.description}
                        category={prod.category}
                        price={prod.price}
                        classCard="product_card"
                    />
                ))
            }
        </div>
    )
}

export default Home