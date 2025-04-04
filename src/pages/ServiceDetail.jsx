import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import ServiceCard from "../components/ServiceCard";
import '../styles/ProductDetail.scss'

function ServiceDetail() {
    const params = useParams();
    const services_in_basket = useSelector(store => store.serviceSlice.services_in_basket)

    return (
        <div className="service-detail">
            {
                services_in_basket && services_in_basket.map(el => {
                    if (el.id == params.id) {
                        return <ServiceCard key={el.id} id={el.id} name={el.name} price={el.price} isDescShow={true} desc={el.description} />
                    }
                })
            }
        </div>
    )
}

export default ServiceDetail