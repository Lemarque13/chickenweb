import React from 'react';
import { useCartStore } from '../state/cartStore';
import { storage, PRODUCT_IMAGES_BUCKET_ID } from '../lib/appwrite';

const ProductCard = ({ product }) => {
  // Получаем функции для изменения корзины и массив товаров
  const { addToCart, removeFromCart, items } = useCartStore();

  // Ищем именно этот товар в корзине
  const itemInCart = items.find((item) => item.$id === product.$id);
  
  // Генерируем URL картинки
  const imageUrl = storage.getFileView(PRODUCT_IMAGES_BUCKET_ID, product.imageID);

  return (
    <div className="product-card">
      <img src={imageUrl.href} alt={product.name} className="product-image" />
      <h4>{product.name}</h4>
      <p>{product.price.toLocaleString('ru-RU')} сум</p>

      {/* Условие: если товара нет в корзине, показываем кнопку "+". */}
      {!itemInCart ? (
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          +
        </button>
      ) : (
        // Если товар уже в корзине, показываем счетчик
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