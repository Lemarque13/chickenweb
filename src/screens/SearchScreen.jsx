import React, { useState, useEffect, useMemo } from 'react';
import { databases, DATABASE_ID, PRODUCTS_COLLECTION_ID } from '../lib/appwrite';
import { Link } from 'react-router-dom';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем все товары один раз при первом рендере компонента
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID, 
          PRODUCTS_COLLECTION_ID
        );
        setAllProducts(response.documents);
      } catch (error) {
        console.error("Failed to fetch products for search", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // Фильтруем товары на основе того, что введено в поле поиска
  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return []; // Если в поиске пусто, ничего не показываем
    }
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allProducts]);


  return (
    <div className="search-screen">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Что вы ищите..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading && <p>Загрузка товаров...</p>}
      
      <div className="search-results-list">
        {searchQuery && filteredProducts.length === 0 && !isLoading && (
          <p className="no-results">По вашему запросу ничего не найдено.</p>
        )}
        {filteredProducts.map(product => (
          <Link to={`/`} key={product.$id} className="search-result-item">
            <img src={product.imageID} alt={product.name} />
            <div className="search-result-details">
              <h4>{product.name}</h4>
              <p>{product.price.toLocaleString('ru-RU')} сум</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchScreen;