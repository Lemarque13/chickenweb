import React, { useState, useEffect, useMemo } from 'react';
import { useCartStore } from '../state/cartStore';
import { databases, DATABASE_ID, PRODUCTS_COLLECTION_ID } from '../lib/appwrite';
import ProductCard from '../components/ProductCard';

// SVG иконка печенья
const CookieIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="80" height="80" style={{ color: 'var(--secondary-bg-color, #f0f0f0)'}}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634a1.96 1.96 0 0 1 .189-.866c0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634s-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634s.828-.419.936-.634Zm-6.75 4.314a1.96 1.96 0 0 1 .189-.866c0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634s-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634s.828-.419.936-.634Zm3.837-2.625a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634s-.828.419-.936.634Z" clipRule="evenodd" />
  </svg>
);


const FavoritesScreen = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const favoriteIds = useCartStore((state) => state.favorites);

  useEffect(() => {
    // Не загружаем все товары, если список избранного пуст
    if (favoriteIds.length === 0) {
      setIsLoading(false);
      return;
    }
    const fetchProducts = async () => {
      try {
        // Можно оптимизировать, чтобы запрашивать только избранные товары,
        // но для простоты пока оставим так.
        const response = await databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION_ID);
        setAllProducts(response.documents);
      } catch (error) {
        console.error("Failed to fetch all products for favorites", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [favoriteIds]); // Перезагружаем, если список избранных изменился

  const favoriteProducts = useMemo(() => {
    if (!Array.isArray(allProducts)) return [];
    return allProducts.filter(product => favoriteIds.includes(product.$id));
  }, [allProducts, favoriteIds]);

  if (isLoading) {
    return <div className="loading-screen">Загрузка избранного...</div>;
  }

  return (
    <div className="favorites-screen">
      <h1>Избранные</h1>
      {favoriteProducts.length === 0 ? (
        // --- НАШ НОВЫЙ БЛОК ДЛЯ ПУСТОГО ЭКРАНА ---
        <div className="favorites-empty-styled">
          <CookieIcon />
          <h2>Ваши избранные блюда пока пусты...</h2>
        </div>
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