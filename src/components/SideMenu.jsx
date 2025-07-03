import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { databases, DATABASE_ID, INFO_PAGES_COLLECTION_ID } from '../lib/appwrite';

// Теперь компонент принимает currentTheme и setTheme
const SideMenu = ({ isOpen, onClose, currentTheme, setTheme }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (isOpen && pages.length === 0) { // Загружаем страницы только один раз при открытии, если их нет
      const fetchPages = async () => {
        try {
          const response = await databases.listDocuments(DATABASE_ID, INFO_PAGES_COLLECTION_ID);
          setPages(response.documents);
        } catch (error) { 
          console.error("Failed to fetch info pages", error); 
        }
      };
      fetchPages();
    }
  }, [isOpen, pages.length]);

  if (!isOpen) {
    return null;
  }

  // Вспомогательный компонент для кнопок темы
  const ThemeButton = ({ theme, children }) => (
    <button
      className={`theme-btn ${currentTheme === theme ? 'active' : ''}`}
      onClick={() => setTheme(theme)} // Вызываем функцию смены темы
    >
      {children}
    </button>
  );

  return (
    <div className="side-menu-overlay" onClick={onClose}>
      <div className="side-menu" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-menu-btn">×</button>
        <h3>Меню</h3>
        <nav className="side-menu-nav">
          {pages.map(page => (
            <Link key={page.$id} to={`/page/${page.slug}`} onClick={onClose}>
              {page.title}
            </Link>
          ))}
        </nav>

        {/* --- БЛОК ПЕРЕКЛЮЧЕНИЯ ТЕМЫ --- */}
        <div className="theme-switcher">
          <h4>Тема</h4>
          <div className="theme-options">
            <ThemeButton theme="light">Светлая</ThemeButton>
            <ThemeButton theme="dark">Темная</ThemeButton>
            <ThemeButton theme="system">Системная</ThemeButton>
          </div>
        </div>

        {/* Здесь можно добавить другие элементы меню */}
      </div>
    </div>
  );
};

export default SideMenu;