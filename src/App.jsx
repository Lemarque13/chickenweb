import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

// Импортируем наши экраны и компоненты
import HomeScreen from './screens/HomeScreen.jsx';
import CartBar from './components/CartBar.jsx';

// Временные заглушки для других экранов
const CartScreen = () => <div>Экран корзины</div>;
const ProfileScreen = () => <div>Экран профиля</div>;
const SearchScreen = () => <div>Экран поиска</div>;
const FavoritesScreen = () => <div>Экран избранного</div>;

function App() {
  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, []);

  return (
    <div className="app-container">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/favorites" element={<FavoritesScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/cart" element={<CartScreen />} />
        </Routes>
      </main>
      <CartBar />
    </div>
  );
}

export default App;