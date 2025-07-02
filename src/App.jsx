import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

// Импорты
import HomeScreen from './screens/HomeScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import InfoPageScreen from './screens/InfoPageScreen.jsx';
import FavoritesScreen from './screens/FavoritesScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import SearchScreen from './screens/SearchScreen.jsx';
import BottomNav from './components/BottomNav.jsx';
import Header from './components/Header.jsx';
import SideMenu from './components/SideMenu.jsx';
import CartBar from './components/CartBar.jsx';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // --- НОВОЕ СОСТОЯНИЕ И ЛОГИКА ДЛЯ ТЕМЫ ---
  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'system');

  useEffect(() => {
    const applyTheme = (theme) => {
      const body = document.body;
      body.classList.remove('light', 'dark');

      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        body.classList.add(systemTheme);
      } else {
        body.classList.add(theme);
      }
      localStorage.setItem('app-theme', theme);
    };

    applyTheme(theme);
  }, [theme]);


  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, []);

  return (
    // Добавляем класс к .app-container, чтобы меню могло влиять на него
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

      <CartBar />
      
      {/* Передаем функцию для смены темы в боковое меню */}
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        currentTheme={theme}
        setTheme={setTheme}
      />
      
      <BottomNav />
    </div>
  );
}

export default App;