import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

// Импортируем все наши компоненты и экраны
import HomeScreen from './screens/HomeScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import InfoPageScreen from './screens/InfoPageScreen.jsx';
import FavoritesScreen from './screens/FavoritesScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import SearchScreen from './screens/SearchScreen.jsx';
import BottomNav from './components/BottomNav.jsx';
import Header from './components/Header.jsx';
import SideMenu from './components/SideMenu.jsx';
import CartBar from './components/CartBar.jsx'; // <-- Снова импортируем нашу плашку

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, []);

  return (
    <div className={`app-container ${isMenuOpen ? 'menu-is-open' : ''}`}>
      <Header onMenuClick={() => setIsMenuOpen(true)} /> 
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/favorites" element={<FavoritesScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/page/:slug" element={<InfoPageScreen />} />
        </Routes>
      </main>

      {/* Размещаем плашку корзины здесь, над нижней навигацией */}
      <CartBar />
      
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <BottomNav />
    </div>
  );
}

export default App;