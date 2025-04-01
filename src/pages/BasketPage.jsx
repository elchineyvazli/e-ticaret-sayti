import { useSelector } from 'react-redux'
import '../css/BasketPage.css'
import ServicesCard from '../components/ServicesCard'

function BasketPage() {
    const services = useSelector(store => store.basketSlicer.services)


    return (
        <div className='basketPage'>
            
        </div>
    )
}

export default BasketPage