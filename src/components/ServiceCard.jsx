import '../styles/Services.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToServiceBasket } from '../slices/serviceSlice';

function ServiceCard({ id, name, price, quantity = 1, isDescShow = false, desc }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className='services-card'>
            <h1>{name}</h1>
            <h4>{price}$</h4>
            {
                isDescShow ?
                    (
                        <>
                            <button onClick={() => navigate("/services-detail/" + id)}>Detala yönləndir</button>
                            <p>{quantity} ədəd</p>
                            <p style={{ textAlign: "center" }}>{desc}</p>
                        </>
                    ) :
                    (
                        <button onClick={() => dispatch(addToServiceBasket(id))}>Səbətə əlavə et</button>
                    )
            }
        </div>
    )
}

export default ServiceCard