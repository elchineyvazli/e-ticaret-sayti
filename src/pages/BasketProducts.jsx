import { useSelector, useDispatch } from 'react-redux';
import { removeFromBasket } from '../slices/productSlice';
import BasketCard from '../components/BasketCard';
import '../styles/pages_styles/BasketProducts.scss';

const normalizeId = (val) => String(val).trim().toLowerCase();

function BasketProducts({ openPopup }) {
    const dispatch = useDispatch();
    const products_in_basket = useSelector(store => store.productSlice.products_in_basket);
    const total_price = useSelector(store => store.productSlice.total_price);

    const handleRemove = (id) => {
        dispatch(removeFromBasket(normalizeId(id)));
    };

    return (
        <div className="basket-container">
            <div className="basket-summary">
                <h2>Səbət Cəmi:</h2>
                <p className="total-price">₼{total_price.toFixed(2)}</p>
            </div>

            <div className="basket-products">
                {products_in_basket.length > 0 ? (
                    products_in_basket.map(product => (
                        <BasketCard
                            id={product.id}
                            key={product.id}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                            image={product.image}
                            quantity={product.quantity}
                            quality={product.quality}
                            total_quantity={product.total_quantity}
                            gallery={product.gallery}
                            onRemove={() => handleRemove(normalizeId(product.id))}
                        />
                    ))
                ) : (
                    <div className="empty-message">
                        <h3>Səbətiniz boşdur.</h3>
                        <img src="../images/mavi-saat" alt="" />
                    </div>
                )}
            </div>

            {products_in_basket.length > 0 && (
                <div className="basket-action">
                    <button className="basket-order-button-global" onClick={openPopup}>
                        Sifarişi Təsdiqlə
                    </button>
                </div>
            )}
        </div>
    );
}

export default BasketProducts;
