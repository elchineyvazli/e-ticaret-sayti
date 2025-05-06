import { useState } from 'react';
import '../styles/comp_styles/ProductCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToProductBasket,
  increaseQuantityProd,
  creaseQuantityProd,
} from '../slices/productSlice';
import { FaStar } from "react-icons/fa6";

const normalizeId = (val) => String(val).trim().toLowerCase();

const ProductCard = ({ id, image, title, description, price, quantity, quality, gallery, total_quantity, tags, brand, stock_status, is_featured }) => {
  const dispatch = useDispatch();
  const product = useSelector((store) =>
    store.productSlice.products.find((p) => normalizeId(p.id) === normalizeId(id))
  );
  const [mainImage, setMainImage] = useState(image || gallery?.[0]);
  const [showGallery, setShowGallery] = useState(false);

  const handleIncrease = () => {
    if (product.quantity < total_quantity) {
      dispatch(increaseQuantityProd(normalizeId(id)));
    } else {
      alert(`Stokda yalnız ${total_quantity} ədəd var!`);
    }
  };

  return (
    <div
      className="card-glass"
      onMouseEnter={() => setShowGallery(true)}
      onMouseLeave={() => setShowGallery(false)}
    >
      {(tags?.length > 0 || brand || stock_status || is_featured) && (
        <div className="product-tags">
          {is_featured && <span className="tag badge featured">🌟 Öne Çıxan</span>}
          {brand && <span className="tag badge">{brand}</span>}
          {stock_status && <span className={`tag badge ${stock_status}`}>{stock_status}</span>}
          {tags?.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="image-wrapper">
        <img className="main" src={mainImage || "/images/error_images/not_found_product_image.jpg"} alt={title} />
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
        <p className="stock-warning">Stokda yalnız {total_quantity} ədəd var</p>
        {product.discount_price && product.discount_price < price ? (
          <div className="price">
            <span className="old-price">₼{price}</span>
            <span className="discounted">₼{product.discount_price}</span>
          </div>
        ) : (
          <div className="price">₼{price}</div>
        )}

        <div className="qty">
          <button onClick={() => dispatch(creaseQuantityProd(normalizeId(id)))}>−</button>
          <span>{product.quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>

        <div className="total">
          Toplam: ₼{((product.discount_price && product.discount_price < price ? product.discount_price : price) * product.quantity).toFixed(2)}
        </div>

        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} fill={i < Math.round(quality) ? '#ffd700' : 'white'} color='black' size={22} />
          ))}
        </div>

        <button onClick={() => dispatch(addToProductBasket([normalizeId(id), product.quantity]))}>
          Səbətə Əlavə Et
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
