import React, { useState, useEffect, useMemo } from 'react'; // Добавили useMemo
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

  // --- НОВАЯ ЛОГИКА ФИЛЬТРАЦИИ ---
  const filteredProducts = useMemo(() => {
    // Если ни одна категория не выбрана, или нет категорий, показываем все товары
    if (!activeCategory || categories.length === 0) {
      return products;
    }
    // Иначе фильтруем товары по ID активной категории
    return products.filter(product => product.categoryID === activeCategory);
  }, [activeCategory, products, categories]);


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
            onClick={() => setActiveCategory(category.$id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Теперь мы отображаем отфильтрованный список */}
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.$id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;