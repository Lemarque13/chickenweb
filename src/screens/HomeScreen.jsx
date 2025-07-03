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

  // --- ЛОГИКА ПРОКРУТКИ К КАТЕГОРИИ ---
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);

    // Находим первый товар, который соответствует этой категории
    const firstProductInCategory = products.find(p => p.categoryID === categoryId);
    
    if (firstProductInCategory) {
      const element = document.getElementById(`product-${firstProductInCategory.$id}`);
      if (element) {
        // Плавно прокручиваем к нему
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };


  if (isLoading) {
    return <div className="loading-screen">Загрузка...</div>;
  }

  // --- СОРТИРОВКА ТОВАРОВ ПО КАТЕГОРИЯМ ДЛЯ КОРРЕКТНОЙ РАБОТЫ ПРОКРУТКИ ---
  const sortedProducts = useMemo(() => {
    // Создаем карту для быстрой привязки категории к ее порядку
    const categoryOrderMap = new Map(categories.map(cat => [cat.$id, cat.order]));
    return [...products].sort((a, b) => {
      const orderA = categoryOrderMap.get(a.categoryID) || 999;
      const orderB = categoryOrderMap.get(b.categoryID) || 999;
      return orderA - orderB;
    });
  }, [products, categories]);

  return (
    <div className="home-screen">
      <div className="categories-list">
        {categories.map(category => (
          <button 
            key={category.$id} 
            className={`category-tab ${activeCategory === category.$id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.$id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {/* Отображаем отсортированный список */}
        {sortedProducts.map(product => (
          <div id={`product-${product.$id}`} key={product.$id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;