import '../css/Serv.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';

function Serv({ id, name, price, quantity = 1, isDescShow = false, desc }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className='serv'>
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
                        <button onClick={() => dispatch(addToBasket(id))}>Add to cart</button>
                    )
            }
        </div>
    )
}

export default Serv