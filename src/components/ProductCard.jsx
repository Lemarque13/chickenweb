import React from 'react';
import { useCartStore } from '../state/cartStore';

// Убираем импорты из appwrite, так как для картинки они больше не нужны

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, items } = useCartStore();

  const itemInCart = items.find((item) => item.$id === product.$id);

  return (
    <div className="product-card">
      {/* ВОЗВРАЩАЕМ НАШ ОБХОДНОЙ ПУТЬ:
        Используем прямую ссылку из поля imageID в базе данных.
      */}
      <img src={product.imageID} alt={product.name} className="product-image" />
      
      <h4>{product.name}</h4>
      <p>{product.price.toLocaleString('ru-RU')} сум</p>

      {!itemInCart ? (
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          +
        </button>
      ) : (
        <div className="quantity-selector">
          <button onClick={() => removeFromCart(product.$id)}>−</button>
          <span>{itemInCart.quantity}</span>
          <button onClick={() => addToCart(product)}>+</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;