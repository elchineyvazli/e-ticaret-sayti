import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearBasket } from '../../slices/productSlice';
import '../../styles/steps_styles/StepFinish.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StepFinish = ({ close }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        axios.post("http://localhost:8000/api/popup-tracks/", {
            product_id: localStorage.getItem("selectedProductId"),
            quantity: parseInt(localStorage.getItem("selectedQuantity") || "1"),
            selected_metro: localStorage.getItem("selectedMetro") || "Naməlum",
            payment_method: localStorage.getItem("selectedMethod") || "Bilinmir",
            total_price: parseFloat(localStorage.getItem("selectedTotal") || "0"),
            proof_uploaded: true,
            is_complete: true,
            start_time: JSON.parse(localStorage.getItem("popupStartTime") || "[]"),
            close_time: [new Date().toISOString()],
            basket: JSON.parse(localStorage.getItem("selectedBasket") || "[]")
        }).then(res => {
            console.log("PopupTrack gönderildi ✅", res.data);
        }).catch(err => {
            console.error("PopupTrack POST xətası ❌", err);
        });

        dispatch(clearBasket());
        setTimeout(() => setFadeOut(true), 2000);
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
