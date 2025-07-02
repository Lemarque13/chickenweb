import React from 'react';
import { useCartStore } from '../state/cartStore';
import { useNavigate, useLocation } from 'react-router-dom'; // <-- Добавили useLocation

const CartBar = () => {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const navigate = useNavigate();
  const location = useLocation(); // <-- Получаем информацию о текущем URL

  // --- НОВОЕ УСЛОВИЕ ---
  // Если в корзине нет товаров ИЛИ мы на странице корзины, ничего не показываем
  if (items.length === 0 || location.pathname === '/cart') {
    return null;
  }

  const totalPrice = getTotalPrice();
  // Стоимость доставки пока задана статично
  const deliveryCost = 15000;

  return (
    <div className="cart-bar-container">
      <div className="cart-bar">
        <div className="delivery-info">
          <span>Стоимость доставки:</span>
          <span>+{deliveryCost.toLocaleString('ru-RU')}</span>
        </div>
        <button className="cart-button" onClick={() => navigate('/cart')}>
          <span>Корзина</span>
          {/* Общая сумма = цена товаров + доставка */}
          <span>{(totalPrice + deliveryCost).toLocaleString('ru-RU')}</span>
        </button>
      </div>
    </div>
  );
};

export default CartBar;