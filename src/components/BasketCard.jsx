import React, { useState, useEffect } from 'react';
import '../styles/BasketCard.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { creaseQuantityProd } from '../slices/productSlice';
import { FaStar } from "react-icons/fa6";

const BasketCard = ({
    title,
    description,
    price,
    image,
    quantity,
    quality,
    gallery = [],
    onRemove,
    id,
}) => {
    const dispatch = useDispatch();
    const [mainImage, setMainImage] = useState(image);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100);
    }, []);

    return (
        <div className={`basket-card ${loaded ? 'fade-in' : ''}`}>
            <button className="delete-button" onClick={onRemove}>
                <AiOutlineClose size={18} />
            </button>

            <div className="basket-image">
                <img src={mainImage} alt={title} className="main-image" />
                {gallery.length > 1 && (
                    <div className="thumbnail-group">
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
                )}
            </div>

            <div className="basket-details">
                <h3 className="title">{title}</h3>

                <p className="description">
                    {showFullDesc ? description : `${description?.substring(0, 80)}...`}
                    {description?.length > 80 && (
                        <span onClick={() => setShowFullDesc(!showFullDesc)} className="read-more">
                            {showFullDesc ? 'Gizlə' : 'Daha çox'}
                        </span>
                    )}
                </p>

                <div className="meta">
                    <span className="price">₼{(price * quantity).toFixed(2)}</span>
                </div>

                <div className="quantity-controls">
                    <button onClick={() => dispatch(creaseQuantityProd(id))}>-</button>
                    <span>{quantity}</span>
                    <button disabled title="Əlavə etmək üçün məhsul səhifəsinə qayıdın">+</button>
                </div>

                <div className="stars">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} fill={i < Math.round(quality) ? '#ffd700' : 'white'} size={22} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BasketCard;
