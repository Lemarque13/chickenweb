import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link для навигации
import { useCartStore } from '../state/cartStore'; // Импортируем стор, чтобы показывать кол-во товаров

// Иконки
const LocationIcon = () => <svg fill="#000000" width="24" height="24" viewBox="0 0 24 24"><path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg>;
const BellIcon = () => <svg fill="#000000" width="24" height="24" viewBox="0 0 24 24"><path d="M14,20H10V19H14M12,22A2,2 0 0,0 14,20H10A2,2 0 0,0 12,22M18,16V11C18,7.93 16.36,5.36 13.5,4.68V4A1.5,1.5 0 0,0 12,2.5A1.5,1.5 0 0,0 10.5,4V4.68C7.63,5.36 6,7.93 6,11V16L4,18V19H20V18L18,16Z" /></svg>;
const MenuIcon = () => <svg fill="#000000" width="24" height="24" viewBox="0 0 24 24"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>;
const CartIcon = () => <svg fill="#000000" width="24" height="24" viewBox="0 0 24 24"><path d="M17,18C15.89,18 15,18.89 15,20C15,21.1 15.89,22 17,22C18.11,22 19,21.1 19,20C19,18.89 18.11,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75L7.2,14.64L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2H1M7,18C5.89,18 5,18.89 5,20C5,21.1 5.89,22 7,22C8.11,22 9,21.1 9,20C9,18.89 8.11,18 7,18Z" /></svg>;


const Header = ({ onMenuClick }) => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="app-header">
      <div className="location-info">
        <LocationIcon />
        <div className="location-text">
          <span>Доставка</span>
          <strong>Ташкент, проезд Минор</strong>
        </div>
      </div>
      <div className="header-actions">
        <BellIcon />
        {/* Делаем иконку корзины ссылкой на /cart */}
        <Link to="/cart" className="header-cart-icon">
          <CartIcon />
          {/* Показываем кружок с количеством, если корзина не пуста */}
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
        <div onClick={onMenuClick} style={{ cursor: 'pointer' }}>
          <MenuIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;