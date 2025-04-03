import ServiceCard from '../components/ServiceCard'
import { useSelector } from 'react-redux'
import '../css/BasketServices.css'

function BasketServices() {

    const services_in_basket = useSelector(store => store.serviceSlice.services_in_basket)

    return (
        <div className='services_basket'>
            {
                services_in_basket > 0 ? services_in_basket.map((el) => {

                    if (el.quantity != 0) {
                        return (
                            <ServiceCard
                                key={el.id}
                                id={el.id}
                                name={el.name}
                                price={el.price}
                                quantity={el.quantity}
                                isDescShow={true}
                                desc={el.description}
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

export default BasketServices