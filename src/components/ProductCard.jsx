import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- НОВЫЙ ИМПОРТ
import { useCartStore } from '../state/cartStore';

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Инициализируем хук навигации

  const favorites = useCartStore((state) => state.favorites);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const toggleFavorite = useCartStore((state) => state.toggleFavorite);
  const items = useCartStore((state) => state.items);

  const itemInCart = items.find((item) => item.$id === product.$id);
  const isFavorite = favorites.includes(product.$id);

  const imageUrl = product && product.imageID ? product.imageID : ''; 

  // Функция для перехода на страницу продукта
  const handleProductClick = () => {
    navigate(`/product/${product.$id}`);
  };

  return (
    // Вешаем onClick на весь product-card, но предотвращаем его для favorite-icon
    <div className="product-card" onClick={handleProductClick}>
      <div className="product-image-container">
        {/* Оборачиваем favorite-icon в функцию, которая останавливает всплытие события */}
        <div 
          className="favorite-icon" 
          onClick={(e) => {
            e.stopPropagation(); // Останавливаем событие, чтобы не сработал onClick родителя
            toggleFavorite(product.$id);
          }}
        >
          <svg fill={isFavorite ? 'var(--active-color)' : 'white'} width="24" height="24" viewBox="0 0 24 24">
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
        </div>
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} className="product-image" />
        ) : (
          <div className="product-image-placeholder">No Image</div>
        )}
      </div>

      <div className="product-info">
        <h4>{product.name}</h4>
        <p>{product.price.toLocaleString('ru-RU')} сум</p>
      </div>

      {/* Кнопки корзины остаются, но их onClick также должен остановить всплытие */}
      {!itemInCart ? (
        <button 
          className="add-to-cart-btn" 
          onClick={(e) => {
            e.stopPropagation(); // Останавливаем событие
            addToCart(product);
          }}
        >
          +
        </button>
      ) : (
        <div className="quantity-selector">
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Останавливаем событие
              removeFromCart(product.$id);
            }}
          >−</button>
          <span>{itemInCart.quantity}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Останавливаем событие
              addToCart(product);
            }}
          >+</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;