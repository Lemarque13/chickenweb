import React from 'react';
import { NavLink } from 'react-router-dom';

// Иконки
const HomeIcon = ({ isActive }) => (
  <svg fill={isActive ? '#ef4444' : '#8e8e93'} width="28" height="28" viewBox="0 0 24 24"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>
);
// Возвращаем иконку Поиска
const SearchIcon = ({ isActive }) => (
  <svg fill={isActive ? '#ef4444' : '#8e8e93'} width="28" height="28" viewBox="0 0 24 24"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
);
const HeartIcon = ({ isActive }) => (
  <svg fill={isActive ? '#ef4444' : '#8e8e93'} width="28" height="28" viewBox="0 0 24 24"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>
);
const ProfileIcon = ({ isActive }) => (
  <svg fill={isActive ? '#ef4444' : '#8e8e93'} width="28" height="28" viewBox="0 0 24 24"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
);


const BottomNav = () => {
  // Обновляем массив ссылок, возвращая Поиск
  const navLinks = [
    { to: '/', icon: HomeIcon, label: 'Главная' },
    { to: '/search', icon: SearchIcon, label: 'Поиск' },
    { to: '/favorites', icon: HeartIcon, label: 'Избранное' },
    { to: '/profile', icon: ProfileIcon, label: 'Профиль' },
  ];

  return (
    <nav className="bottom-nav">
      {navLinks.map((link) => (
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