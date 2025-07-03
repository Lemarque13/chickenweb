import React, { useState, useEffect, useMemo } from 'react';
import { databases, DATABASE_ID, CATEGORIES_COLLECTION_ID } from '../lib/appwrite';
import { Link } from 'react-router-dom';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID, 
          CATEGORIES_COLLECTION_ID
        );
        const sortedCategories = response.documents.sort((a, b) => a.order - b.order);
        setAllCategories(sortedCategories);
      } catch (error) {
        console.error("Failed to fetch categories for search", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    // Добавляем проверку, что allCategories - это массив
    if (!Array.isArray(allCategories)) return [];
    if (!searchQuery) {
      return allCategories;
    }
    return allCategories.filter(category =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allCategories]);

  return (
    <div className="search-screen-new">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Что вы ищите..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading && <p className="loading-screen">Загрузка категорий...</p>}
      
      <div className="search-category-list">
        {!isLoading && filteredCategories.length === 0 ? (
          <p className="no-results">Категории не найдены.</p>
        ) : (
          filteredCategories.map(category => (
            <Link to={`/`} key={category.$id} className="search-category-item">
              {category.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchScreen;