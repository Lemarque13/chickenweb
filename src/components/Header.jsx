import React from 'react';

// Иконки
const LocationIcon = () => <svg fill="#000000" width="24" height="24" viewBox="0 0 24 24"><path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg>;
const BellIcon = () => <svg fill="#000000" width="24" height="24" viewBox="0 0 24 24"><path d="M14,20H10V19H14M12,22A2,2 0 0,0 14,20H10A2,2 0 0,0 12,22M18,16V11C18,7.93 16.36,5.36 13.5,4.68V4A1.5,1.5 0 0,0 12,2.5A1.5,1.5 0 0,0 10.5,4V4.68C7.63,5.36 6,7.93 6,11V16L4,18V19H20V18L18,16Z" /></svg>;
const MenuIcon = () => <svg fill="#000000" width="24" height="24" viewBox="0 0 24 24"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>;

// Теперь Header принимает пропс onMenuClick
const Header = ({ onMenuClick }) => {
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
        {/* Добавляем обработчик клика на иконку меню */}
        <div onClick={onMenuClick} style={{ cursor: 'pointer' }}>
          <MenuIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;