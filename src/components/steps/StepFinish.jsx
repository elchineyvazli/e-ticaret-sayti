import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearBasket } from '../../slices/productSlice';
import '../../styles/steps_styles/StepFinish.scss';
import { useNavigate } from 'react-router-dom';

const StepFinish = ({ close }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        dispatch(clearBasket());

        setTimeout(() => {
            setFadeOut(true);
        }, 2000);
        
        localStorage.removeItem("shouldReopenPopup");
        localStorage.setItem("reopenStep", "1");

        const timeout = setTimeout(() => {
            close();
            navigate('/');
        }, 4000);

        return () => clearTimeout(timeout);
    }, [dispatch, close, navigate]);

    return (
        <div className={`finish-container ${fadeOut ? 'fade-out' : ''}`}>
            <div className="finish-icon">✅</div>
            <h2 className="finish-title">Ödəniş Təsdiqləndi!</h2>
            <p className="finish-message">Sifarişiniz qeydə alındı. Sizə tezliklə geri dönüş ediləcək.</p>
            <button className="btn primary" onClick={() => {
                close();
                navigate('/');
            }}>Bağla</button>
        </div>
    );
};

export default StepFinish;
