import React, { useState } from 'react';
import { useCartStore } from '../state/cartStore';
import { databases, DATABASE_ID, ORDERS_COLLECTION_ID, ID } from '../lib/appwrite';
import WebApp from '@twa-dev/sdk';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useCartStore();
  const imageUrl = item.imageID;

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

const CartScreen = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [address, setAddress] = useState('');
  const [comments, setComments] = useState('');

  const totalPrice = getTotalPrice();
  const deliveryCost = 15000;

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert('Пожалуйста, укажите адрес доставки.');
      return;
    }
    if (isLoading || items.length === 0) return;
    setIsLoading(true);

    try {
      const userData = WebApp.initDataUnsafe?.user;

      const orderData = {
        userID: userData?.id.toString() || 'unknown',
        userName: `${userData?.first_name || ''} ${userData?.last_name || ''}`.trim(),
        userPhone: 'not_provided',
        items: JSON.stringify(items.map(item => ({id: item.$id, name: item.name, quantity: item.quantity, price: item.price }))),
        totalAmount: totalPrice + deliveryCost,
        deliveryCost: deliveryCost,
        status: 'new',
        paymentMethod: paymentMethod,
        address: address,
        comments: comments,
      };

      await databases.createDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        ID.unique(),
        orderData
      );

      alert('Ваш заказ успешно оформлен!');
      clearCart();
      navigate('/');

    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
      alert("Не удалось оформить заказ. Пожалуйста, попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cart-screen">
      <div className="cart-header">
        <h1>Корзина</h1>
        {items.length > 0 && (
          <button onClick={clearCart} className="clear-cart-btn" disabled={isLoading}>
            Очистить корзину
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Ваша корзина пока пуста...</p>
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
            
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input 
                id="address"
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Город, улица, дом, квартира"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Комментарий к заказу</label>
              <textarea 
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows="3"
                placeholder="Например, код от домофона или просьба не звонить в дверь"
              />
            </div>

            <div className="payment-methods">
              <h4>Способ оплаты</h4>
              <div className="payment-options">
                <button 
                  className={`payment-btn ${paymentMethod === 'cash' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  Наличные
                </button>
                <button 
                  className={`payment-btn ${paymentMethod === 'click' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('click')}
                >
                  Click Pay
                </button>
              </div>
            </div>

            <div className="summary-row total">
              <span>Итого</span>
              <span>{(totalPrice + deliveryCost).toLocaleString('ru-RU')} сум</span>
            </div>
            <button onClick={handlePlaceOrder} className="place-order-btn" disabled={isLoading}>
              {isLoading ? 'Оформление...' : 'Оформить заказ'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;