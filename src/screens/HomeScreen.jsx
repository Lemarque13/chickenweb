import React, { useState, useEffect, useMemo } from 'react';
import { databases, DATABASE_ID, CATEGORIES_COLLECTION_ID, PRODUCTS_COLLECTION_ID } from '../lib/appwrite';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!databases || !DATABASE_ID || !CATEGORIES_COLLECTION_ID || !PRODUCTS_COLLECTION_ID) {
          console.error("[HomeScreen] Appwrite databases service or IDs are not ready.");
          setFetchError("Проблема с подключением к серверу. Попробуйте обновить страницу.");
          setIsLoading(false);
          return; 
        }

        console.log("[HomeScreen] Fetching categories and products...");

        const [categoriesResponse, productsResponse] = await Promise.all([
          databases.listDocuments(DATABASE_ID, CATEGORIES_COLLECTION_ID),
          databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION_ID),
        ]);
        
        const sortedCategories = categoriesResponse.documents.sort((a, b) => (a.order || 0) - (b.order || 0));
        setCategories(sortedCategories);
        setProducts(productsResponse.documents);
        
        if (sortedCategories.length > 0) {
          setActiveCategory(sortedCategories[0].$id); // Устанавливаем первую категорию активной по умолчанию
        }
        console.log("[HomeScreen] Data fetched successfully. Categories:", sortedCategories, "Products:", productsResponse.documents);
      } catch (error) {
        console.error("[HomeScreen] Error fetching data:", error);
        setFetchError("Не удалось загрузить данные: " + (error.message || "Неизвестная ошибка"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 

  // --- ЛОГИКА ПРОКРУТКИ К РАЗДЕЛУ КАТЕГОРИИ ---
  const handleCategoryClick = (categoryId) => {
    console.log("[HomeScreen] Category clicked:", categoryId); 
    setActiveCategory(categoryId); // Подсвечиваем активную кнопку

    const element = document.getElementById(`category-section-${categoryId}`); // Ищем заголовок категории
    
    if (element) {
      console.log("[HomeScreen] Category section element found. Attempting to scroll..."); // DEBUG: Добавлен лог перед прокруткой
      const headerOffset = 70; // Примерный размер вашей шапки
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      console.log("[HomeScreen] Scrolling to position:", offsetPosition, "Element top:", element.getBoundingClientRect().top, "Window Y Offset:", window.pageYOffset); // DEBUG: Этот лог должен появиться!

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else {
      console.warn(`[HomeScreen] Category section element with ID category-section-${categoryId} not found in DOM.`); 
    }
  };

  const sortedProducts = useMemo(() => {
    if (!Array.isArray(products) || !Array.isArray(categories)) {
      console.warn("[HomeScreen] Products or Categories are not arrays for sorting."); 
      return [];
    }
    const categoryOrderMap = new Map(categories.map(cat => [cat.$id, cat.order || 0]));
    
    return [...products].sort((a, b) => {
      const orderA = categoryOrderMap.get(a.categoryID) || 999;
      const orderB = categoryOrderMap.get(b.categoryID) || 999;
      
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return a.$id.localeCompare(b.$id); // Для стабильного порядка внутри одной категории
    });
  }, [products, categories]);

  if (isLoading) {
    return <div className="loading-screen">Загрузка данных...</div>;
  }

  if (fetchError) {
    return <div className="error-screen" style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
             <p>{fetchError}</p>
             <p>Пожалуйста, проверьте консоль разработчика для деталей.</p>
           </div>;
  }

  if (!products || products.length === 0) {
    return <div className="no-results">Пока нет доступных товаров.</div>;
  }

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

      <div className="category-sections-container">
        {categories.map(category => (
          <div 
            key={category.$id} 
            id={`category-section-${category.$id}`} 
            className="category-section"
          >
            <h2 className="category-section-title">{category.name}</h2>
            <div className="products-grid">
              {sortedProducts
                .filter(product => product.categoryID === category.$id)
                .map(product => (
                  <div id={`product-${product.$id}`} key={product.$id}>
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
            {sortedProducts.filter(product => product.categoryID === category.$id).length === 0 && (
                <p className="no-products-in-category">Нет товаров в этой категории.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;