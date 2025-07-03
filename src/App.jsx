import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Убираем useNavigate, чтобы исключить его влияние на ранние ошибки
import WebApp from '@twa-dev/sdk'; // Импортируем TWA SDK

// Импорты экранов
import HomeScreen from './screens/HomeScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import InfoPageScreen from './screens/InfoPageScreen.jsx';
import FavoritesScreen from './screens/FavoritesScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import SearchScreen from './screens/SearchScreen.jsx';
import ProductDetailScreen from './screens/ProductDetailScreen.jsx';

// Импорты компонентов
import BottomNav from './components/BottomNav.jsx';
import Header from './components/Header.jsx';
import SideMenu from './components/SideMenu.jsx';
import CartBar from './components/CartBar.jsx';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Состояние и логика для смены темы
  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'system');

  useEffect(() => {
    // Функция для применения темы к body
    const applyTheme = (currentTheme) => {
      const body = document.body;
      body.classList.remove('light', 'dark'); // Удаляем предыдущие классы темы

      if (currentTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        body.classList.add(systemTheme);
      } else {
        body.classList.add(currentTheme); // Добавляем 'light' или 'dark'
      }
      localStorage.setItem('app-theme', currentTheme); // Сохраняем выбор пользователя
      console.log('[DEBUG-App] Applied theme:', currentTheme); // DEBUG: Логируем применение темы
    };

    applyTheme(theme); // Применяем тему при загрузке и изменении состояния 'theme'
  }, [theme]); // Зависимость от состояния 'theme'

  useEffect(() => {
    // Инициализация Telegram Web App SDK
    try {
      console.log('[DEBUG-App] WebApp: Attempting ready()'); // DEBUG: Логируем вызов ready()
      WebApp.ready();
      console.log('[DEBUG-App] WebApp: Attempting expand()'); // DEBUG: Логируем вызов expand()
      WebApp.expand();
      console.log('[DEBUG-App] WebApp initialized successfully.'); // DEBUG: Логируем успешную инициализацию
    } catch (e) {
      console.error('[DEBUG-App] Error initializing WebApp SDK:', e); // DEBUG: Логируем ошибку инициализации WebApp
    }
    
    // Если хотите, чтобы приложение всегда открывалось на главной, эту логику можно добавить позже,
    // когда основное приложение будет стабильно работать.
    // const navigate = useNavigate(); // Нельзя использовать хуки условно или вне компонента
    // navigate('/'); 
    
  }, []); // Пустой массив зависимостей для однократного запуска при монтировании

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
          <Route path="/product/:productId" element={<ProductDetailScreen />} />
        </Routes>
      </main>

      <CartBar />
      
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