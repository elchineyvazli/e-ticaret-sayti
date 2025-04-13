import React, { useState } from 'react';
import '../styles/BasketCard.scss';

const BasketCard = ({ title, description, price, image, quantity, quality, gallery = [] }) => {
    const [mainImage, setMainImage] = useState(image);

    return (
        <div className="basket-card wide">
            <div className="basket-image-gallery">
                <img src={mainImage} alt={title} className="basket-main-image" />
                <div className="basket-thumbnails">
                    {gallery.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`thumb-${idx}`}
                            className={`thumb ${mainImage === img ? 'active' : ''}`}
                            onClick={() => setMainImage(img)}
                        />
                    ))}
                </div>
            </div>
            <div className="basket-info">
                <h3 className="basket-title">{title}</h3>
                <p className="basket-description">{description}</p>
                <div className="basket-quantity">Miqdar: {quantity}</div>
                <div className="basket-total">Toplam: ₼{(price * quantity).toFixed(2)}</div>
                <div className="basket-stars">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`star ${i < quality ? 'filled' : ''}`}></div>
                    ))}
                </div>
                <button className="basket-order-button">Sifarişi Təsdiqlə</button>
            </div>
        </div>
    );
};

export default BasketCard;
