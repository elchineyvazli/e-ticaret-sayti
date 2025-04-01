import '../css/Services.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToServiceBasket } from '../slices/basketSlice';

function ServicesCard({ id, name, price, quantity = 1, isDescShow = false, desc }) {

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
                            <button onClick={() => navigate("/services-detail/" + id)}>Go to Detail</button>
                            <p>quantity : {quantity}</p>
                            <p style={{ textAlign: "center" }}>{desc}</p>
                        </>
                    ) :
                    (
                        <button onClick={() => dispatch(addToServiceBasket(id))}>Add to cart</button>
                    )
            }
        </div>
    )
}

export default ServicesCard