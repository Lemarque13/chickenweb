import React from 'react';
import { useCartStore } from '../state/cartStore';

// Этот компонент будет использоваться для отображения каждой позиции в корзине
const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useCartStore();
  const imageUrl = item.imageID; // Используем прямую ссылку из "обходного пути"

  return (
    <div className="cart-item">
      <img src={imageUrl} alt={item.name} className="cart-item-image" />
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
  );
};

// Основной компонент экрана корзины
const CartScreen = () => {
  // Получаем все необходимые данные и функции из хранилища
  const { items, getTotalPrice, clearCart } = useCartStore();

  const totalPrice = getTotalPrice();
  const deliveryCost = 15000; // Стоимость доставки пока задана статично

  // Функция для обработки нажатия на кнопку "Оформить заказ"
  const handlePlaceOrder = () => {
    // Пока просто выводим сообщение. В будущем здесь будет логика отправки заказа в Appwrite.
    alert(`Заказ на сумму ${(totalPrice + deliveryCost).toLocaleString('ru-RU')} сум оформлен! (пока не по-настоящему)`);
  };


  return (
    <div className="cart-screen">
      <div className="cart-header">
        <h1>Корзина</h1>
        {items.length > 0 && (
          <button onClick={clearCart} className="clear-cart-btn">Очистить корзину</button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Ваша корзина пока пуста...</p>
          <p>Добавьте что-нибудь с главного экрана, чтобы сделать заказ.</p>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {items.map(item => <CartItem key={item.$id} item={item} />)}
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
            <button onClick={handlePlaceOrder} className="place-order-btn">
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;