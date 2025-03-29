import { useSelector } from 'react-redux'
import Serv from '../components/Serv'
import '../css/Serv.css'

function Services() {

    const { services } = useSelector(store => store.basketSlicer);

    return (
        <div className='services'>
            {
                services && services.map((el) => (
                    <Serv
                        key={el.id}
                        id={el.id}
                        name={el.name}
                        price={el.price}
                    />
                ))
            }
        </div>
    )
}

export default Services