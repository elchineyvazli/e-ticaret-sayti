import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import Serv from "../components/Serv";

function ServicesDetail() {
    const params = useParams();
    const services = useSelector(store => store.basketSlicer.services)

    return (
        <div className="services-detail">
            {
                services && services.map(el => {
                    if (el.id == params.id) {
                        return <Serv key={el.id} id={el.id} name={el.name} price={el.price} isDescShow={true} desc={el.description} />
                    }
                })
            }
        </div>
    )
}

export default ServicesDetail