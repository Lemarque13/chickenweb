import React, { useState, useEffect } from 'react';
import { databases, DATABASE_ID, CATEGORIES_COLLECTION_ID, PRODUCTS_COLLECTION_ID } from '../lib/appwrite';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Добавляем состояние для отслеживания активной категории
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          databases.listDocuments(DATABASE_ID, CATEGORIES_COLLECTION_ID),
          databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION_ID),
        ]);
        
        setCategories(categoriesResponse.documents);
        setProducts(productsResponse.documents);
        // Устанавливаем первую категорию как активную по умолчанию
        if (categoriesResponse.documents.length > 0) {
          setActiveCategory(categoriesResponse.documents[0].$id);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        alert("Не удалось загрузить данные. Проверьте консоль (F12).");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="loading-screen">Загрузка...</div>;
  }

  return (
    <div className="home-screen">
      <div className="categories-list">
        {categories.map(category => (
          // Применяем класс 'active', если ID категории совпадает с активным
          // При клике устанавливаем эту категорию как активную
          <button 
            key={category.$id} 
            className={`category-tab ${activeCategory === category.$id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.$id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.$id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;