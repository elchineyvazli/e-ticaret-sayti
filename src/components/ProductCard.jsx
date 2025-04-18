import { useState } from 'react';
import '../styles/ProductCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToProductBasket,
  increaseQuantityProd,
  creaseQuantityProd,
} from '../slices/productSlice';

const ProductCard = ({ id, image, title, description, price, quantity, quality, gallery }) => {
  const dispatch = useDispatch();
  const product = useSelector((store) =>
    store.productSlice.products.find((p) => p.id === id)
  );
  const [mainImage, setMainImage] = useState(image || gallery?.[0]);
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div
      className="card-glass"
      onMouseEnter={() => setShowGallery(true)}
      onMouseLeave={() => setShowGallery(false)}
    >
      <div className="image-wrapper">
        <img className="main" src={mainImage} alt={title} />
        {showGallery && (
          <div className="floating-gallery">
            {gallery?.map((img, i) => (
              <img
                key={i}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/error_images/not_found_product_image.jpg";
                }}
                src={img}
                className={`thumb ${mainImage === img ? 'active' : ''}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="info">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="price">₼{price}</div>

        <div className="qty">
          <button onClick={() => dispatch(creaseQuantityProd(id))}>−</button>
          <span>{product.quantity}</span>
          <button onClick={() => dispatch(increaseQuantityProd(id))}>+</button>
        </div>

        <div className="total">Toplam: ₼{(price * product.quantity).toFixed(2)}</div>

        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < quality ? 'filled' : ''}>★</span>
          ))}
        </div>

        <button onClick={() => dispatch(addToProductBasket([id, product.quantity]))}>
          Səbətə Əlavə Et
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
