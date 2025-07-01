import React from 'react';
import { NavLink } from 'react-router-dom';

// Иконки (добавляем иконку корзины)
const HomeIcon = ({ isActive }) => (
  <svg fill={isActive ? '#000000' : '#8e8e93'} width="28" height="28" viewBox="0 0 24 24"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>
);
// ЗАМЕНЯЕМ ИКОНКУ ПОИСКА НА ИКОНКУ КОРЗИНЫ
const CartIcon = ({ isActive }) => (
    <svg fill={isActive ? '#000000' : '#8e8e93'} width="28" height="28" viewBox="0 0 24 24"><path d="M17,18C15.89,18 15,18.89 15,20C15,21.1 15.89,22 17,22C18.11,22 19,21.1 19,20C19,18.89 18.11,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75L7.2,14.64L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2H1M7,18C5.89,18 5,18.89 5,20C5,21.1 5.89,22 7,22C8.11,22 9,21.1 9,20C9,18.89 8.11,18 7,18Z" /></svg>
);
const HeartIcon = ({ isActive }) => (
  <svg fill={isActive ? '#000000' : '#8e8e93'} width="28" height="28" viewBox="0 0 24 24"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>
);
const ProfileIcon = ({ isActive }) => (
  <svg fill={isActive ? '#000000' : '#8e8e93'} width="28" height="28" viewBox="0 0 24 24"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
);


const BottomNav = () => {
  // ОБНОВЛЯЕМ МАССИВ ССЫЛОК
  const navLinks = [
    { to: '/', icon: HomeIcon, label: 'Главная' },
    { to: '/cart', icon: CartIcon, label: 'Корзина' }, // Раньше здесь был поиск
    { to: '/favorites', icon: HeartIcon, label: 'Избранное' },
    { to: '/profile', icon: ProfileIcon, label: 'Профиль' },
  ];

  return (
    <nav className="bottom-nav">
      {navLinks.map((link) => (
        // Используем end в NavLink для главной страницы, чтобы она не была активна всегда
        <NavLink key={link.to} to={link.to} end={link.to === '/'} className="nav-link">
          {({ isActive }) => (
            <>
              {link.icon({ isActive })}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;