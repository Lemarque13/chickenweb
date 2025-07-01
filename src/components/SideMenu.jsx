import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { databases, DATABASE_ID, INFO_PAGES_COLLECTION_ID } from '../lib/appwrite';

const SideMenu = ({ isOpen, onClose }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    // Загружаем список инфо-страниц при первом открытии меню
    if (isOpen && pages.length === 0) {
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

  return (
    // Оверлей, который затемняет фон и закрывает меню по клику
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
          {/* Можно добавить и другие ссылки, не из базы данных */}
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;