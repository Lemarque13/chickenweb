import React from 'react';
import { useCartStore } from '../state/cartStore';

const CartScreen = () => {
  // Получаем все необходимые данные и функции из хранилища
  const { items, getTotalPrice, clearCart, addToCart, removeFromCart } = useCartStore();

  const totalPrice = getTotalPrice();
  const deliveryCost = 15000; // Стоимость доставки пока статична

  if (items.length === 0) {
    return (
      <div className="cart-screen">
        <h1>Корзина</h1>
        <div className="cart-empty">
          <p>Ваша корзина пока пуста...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-screen">
      <div className="cart-header">
        <h1>Корзина</h1>
        <button onClick={clearCart} className="clear-cart-btn">Очистить корзину</button>
      </div>

      <div className="cart-items-list">
        {items.map(item => (
          <div key={item.$id} className="cart-item">
            <img src={item.imageURL} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p>{(item.price * item.quantity).toLocaleString('ru-RU')} сум</p>
            </div>
            <div className="quantity-selector cart-item-selector">
              <button onClick={() => removeFromCart(item.$id)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => addToCart(item)}>+</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="summary-row">
          <span>Товары</span>
          <span>{totalPrice.toLocaleString('ru-RU')} сум</span>
        </div>
        <div className="summary-row">
          <span>Доставка</span>
          <span>{deliveryCost.toLocaleString('ru-RU')} сум</span>
        </div>
        <div className="summary-row total">
          <span>Итого</span>
          <span>{(totalPrice + deliveryCost).toLocaleString('ru-RU')} сум</span>
        </div>
        <button className="place-order-btn">Оформить заказ</button>
      </div>
    </div>
  );
};

export default CartScreen;