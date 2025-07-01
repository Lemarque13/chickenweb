import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

// Импортируем наши экраны и компоненты
import HomeScreen from './screens/HomeScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import BottomNav from './components/BottomNav.jsx';
import Header from './components/Header.jsx'; // <-- Добавили импорт хедера

// Временные заглушки для других экранов
const ProfileScreen = () => <div style={{padding: '20px'}}>Экран профиля</div>;
const SearchScreen = () => <div style={{padding: '20px'}}>Экран поиска</div>;
const FavoritesScreen = () => <div style={{padding: '20px'}}>Экран избранного</div>;

function App() {
  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, []);

  return (
    <div className="app-container">
      <Header /> {/* <-- Добавили хедер */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/favorites" element={<FavoritesScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/cart" element={<CartScreen />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

export default App;