import { useSelector } from 'react-redux'
import ServicesCard from '../components/ServicesCard'
import '../css/Services.css'

function Services() {

    const { services } = useSelector(store => store.basketSlicer);

    return (
        <div className='services'>
            {
                services.length > 0 ? services.map((el) => (
                    <ServicesCard
                        key={el.id}
                        id={el.id}
                        name={el.name}
                        price={el.price}
                    />
                ))
                : <h1></h1>
            }
        </div>
    )
}

export default Services