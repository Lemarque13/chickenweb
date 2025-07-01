import React from 'react';
import { useCartStore } from '../state/cartStore';
import { useNavigate } from 'react-router-dom';

const CartBar = () => {
  const { items, getTotalPrice } = useCartStore();
  const navigate = useNavigate();

  // Если в корзине нет товаров, ничего не показываем
  if (items.length === 0) {
    return null;
  }

  const totalPrice = getTotalPrice();

  return (
    <div className="cart-bar-container">
      <div className="cart-bar">
        {/* Здесь будет стоимость доставки, пока статично */}
        <div className="delivery-info">
          <span>Стоимость доставки:</span>
          <span>+15 000</span>
        </div>
        <button className="cart-button" onClick={() => navigate('/cart')}>
          <span>Корзина</span>
          {/* Общая сумма = цена товаров + доставка */}
          <span>{(totalPrice + 15000).toLocaleString('ru-RU')}</span>
        </button>
      </div>
    </div>
  );
};

export default CartBar;