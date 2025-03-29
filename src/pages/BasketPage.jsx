import { useSelector } from 'react-redux'
import '../css/BasketPage.css'
import Serv from '../components/Serv'

function BasketPage() {
    const services = useSelector(store => store.basketSlicer.services)


    return (
        <div className='basketPage'>
            {
                services > 0 ? services.map((el) => {

                    if (el.quantity != 0) {
                        return (
                            <Serv
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

export default BasketPage