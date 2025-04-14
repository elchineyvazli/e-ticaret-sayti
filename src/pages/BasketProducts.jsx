import { useSelector } from 'react-redux';
import BasketCard from '../components/BasketCard';
import '../styles/BasketProducts.scss';

function BasketProducts({ openPopup }) { // openPopup'u props olarak alıyoruz
    const products_in_basket = useSelector(store => store.productSlice.products_in_basket);
    const total_price = useSelector(store => store.productSlice.total_price);

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
                            key={product.id}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                            image={product.image}
                            quantity={product.quantity}
                            quality={product.quality}
                            total_quantity={product.total_quantity}
                            gallery={[
                                "/image/1.jpg",
                                "/image/2.jpg",
                                "/image/3.jpg",
                                "/image/4.jpg",
                            ]}
                            openPopup={openPopup} // Popup'ı tetikleyecek fonksiyon burada
                        />
                    ))
                ) : (
                    <div className="empty-message">
                        <h3>Səbətiniz boşdur.</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BasketProducts;
