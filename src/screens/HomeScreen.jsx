import React, { useState, useEffect, useMemo } from 'react';
import { databases, DATABASE_ID, CATEGORIES_COLLECTION_ID, PRODUCTS_COLLECTION_ID } from '../lib/appwrite';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          databases.listDocuments(DATABASE_ID, CATEGORIES_COLLECTION_ID),
          databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION_ID),
        ]);
        
        const sortedCategories = categoriesResponse.documents.sort((a, b) => a.order - b.order);
        setCategories(sortedCategories);
        setProducts(productsResponse.documents);
        
        if (sortedCategories.length > 0) {
          setActiveCategory(sortedCategories[0].$id);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- НОВАЯ ЛОГИКА ПРОКРУТКИ ---
  const handleCategoryClick = (categoryId) => {
    // 1. Устанавливаем активную категорию для подсветки кнопки
    setActiveCategory(categoryId);

    // 2. Находим первый товар, который соответствует этой категории
    // Сначала отсортируем все товары, чтобы они шли по порядку категорий
    const firstProductInCategory = products
      .sort((a, b) => a.categoryID.localeCompare(b.categoryID))
      .find(p => p.categoryID === categoryId);
    
    if (firstProductInCategory) {
      // 3. Находим соответствующий элемент на странице по его ID
      const element = document.getElementById(`product-${firstProductInCategory.$id}`);
      if (element) {
        // 4. Плавно прокручиваем к нему
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };


  if (isLoading) {
    return <div className="loading-screen">Загрузка...</div>;
  }

  return (
    <div className="home-screen">
      <div className="categories-list">
        {categories.map(category => (
          <button 
            key={category.$id} 
            className={`category-tab ${activeCategory === category.$id ? 'active' : ''}`}
            // Вызываем нашу новую функцию при клике
            onClick={() => handleCategoryClick(category.$id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Мы снова отображаем ВСЕ товары, а не отфильтрованные */}
      <div className="products-grid">
        {products.map(product => (
          // Оборачиваем карточку в div с уникальным ID для прокрутки
          <div id={`product-${product.$id}`} key={product.$id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;