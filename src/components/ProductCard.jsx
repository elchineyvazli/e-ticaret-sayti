import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToProductBasket,
  increaseQuantityProd,
  creaseQuantityProd,
} from '../slices/productSlice';
import '../styles/ProductCard.scss';


const ProductCard = ({ id, image, title, description, price, quantity, quality }) => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.productSlice.products);
  const product = products.find((p) => p.id === id);

  const handleIncrease = () => {
    dispatch(increaseQuantityProd(id));
  };

  const handleDecrease = () => {
    dispatch(creaseQuantityProd(id));
  };

  const handleAddToBasket = () => {
    dispatch(addToProductBasket([id, product.quantity]));
  };

  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <div className="product-content">
        <h2 className="product-title">{title}</h2>
        <p className="product-description">{description}</p>
        <div className="product-price">₼{price.toFixed(2)}</div>

        <div className="quantity-control">
          <button onClick={handleDecrease}>-</button>
          <span>{product.quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>

        <div className="total-value">
          Toplam: ₼{(price * product.quantity).toFixed(2)}
        </div>

        <div className="star-rating">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`star ${i < quality ? 'filled' : ''}`}></div>
          ))}
        </div>

        <button className="add-to-basket" onClick={handleAddToBasket}>
          Səbətə Əlavə Et
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
