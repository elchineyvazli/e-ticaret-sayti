import React, { useState } from 'react';
import '../styles/BasketCard.scss';

const BasketCard = ({
    title,
    description,
    price,
    image,
    quantity,
    quality,
    gallery = []
}) => {
    const [mainImage, setMainImage] = useState(image);

    return (
        <div className="basket-card">
            <div className="basket-image">
                <img src={mainImage} alt={title} className="main-image" />
                <div className="thumbnail-group">
                    {gallery.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt=""
                            className={`thumb ${mainImage === img ? 'active' : ''}`}
                            onClick={() => setMainImage(img)}
                        />
                    ))}
                </div>
            </div>
            <div className="basket-details">
                <h3 className="title">{title}</h3>
                <p className="description">{description}</p>
                <div className="meta">
                    <span className="quantity">Miqdar: {quantity}</span>
                    <span className="price">₼{(price * quantity).toFixed(2)}</span>
                </div>
                <div className="stars">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`star ${i < quality ? 'filled' : ''}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BasketCard;
