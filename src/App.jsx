import React, { useState, useEffect } from 'react'; // Добавили useState
import { Routes, Route } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

// Импортируем все наши компоненты и экраны
import HomeScreen from './screens/HomeScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import InfoPageScreen from './screens/InfoPageScreen.jsx'; // <-- Новый экран
import BottomNav from './components/BottomNav.jsx';
import Header from './components/Header.jsx';
import SideMenu from './components/SideMenu.jsx'; // <-- Новое меню

// Заглушки
const ProfileScreen = () => <div style={{padding: '20px'}}>Экран профиля</div>;
const FavoritesScreen = () => <div style={{padding: '20px'}}>Экран избранного</div>;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для управления меню

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, []);

  return (
    <div className={`app-container ${isMenuOpen ? 'menu-is-open' : ''}`}>
      {/* Передаем функцию для открытия меню в Header */}
      <Header onMenuClick={() => setIsMenuOpen(true)} /> 
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          {/* Убрали search, так как он не используется в дизайне */}
          <Route path="/favorites" element={<FavoritesScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          {/* Добавили динамический маршрут для инфо-страниц */}
          <Route path="/page/:slug" element={<InfoPageScreen />} />
        </Routes>
      </main>

      {/* Передаем состояние и функцию закрытия в SideMenu */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <BottomNav />
    </div>
  );
}

export default App;