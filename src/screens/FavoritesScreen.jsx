import React, { useState, useEffect, useMemo } from 'react';
import { useCartStore } from '../state/cartStore';
import { databases, DATABASE_ID, PRODUCTS_COLLECTION_ID } from '../lib/appwrite';
import ProductCard from '../components/ProductCard';

const FavoritesScreen = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Получаем массив ID избранных товаров из нашего хранилища
  const favoriteIds = useCartStore((state) => state.favorites);

  // Загружаем ВСЕ товары один раз при загрузке экрана
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION_ID);
        setAllProducts(response.documents);
      } catch (error) {
        console.error("Failed to fetch all products for favorites", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Фильтруем все товары, оставляя только те, чьи ID есть в списке избранных
  // useMemo кэширует результат, чтобы фильтрация не запускалась при каждой перерисовке
  const favoriteProducts = useMemo(() => {
    return allProducts.filter(product => favoriteIds.includes(product.$id));
  }, [allProducts, favoriteIds]);

  if (isLoading) {
    return <div className="loading-screen">Загрузка избранного...</div>;
  }

  return (
    <div className="favorites-screen">
      <h1>Избранные товары</h1>
      {favoriteProducts.length === 0 ? (
        <p className="favorites-empty">Вы еще ничего не добавили в избранное. Нажмите на сердечко на товаре, чтобы сохранить его здесь.</p>
      ) : (
        <div className="products-grid">
          {favoriteProducts.map(product => (
            <ProductCard key={product.$id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesScreen;