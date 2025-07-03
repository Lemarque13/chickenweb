import React, { useState, useEffect, useMemo } from 'react';
import { useCartStore } from '../state/cartStore';
import { databases, DATABASE_ID, PRODUCTS_COLLECTION_ID } from '../lib/appwrite';
import ProductCard from '../components/ProductCard';

const FavoritesScreen = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const favoriteIds = useCartStore((state) => state.favorites);

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

  const favoriteProducts = useMemo(() => {
    // Добавляем проверку, что allProducts - это массив
    if (!Array.isArray(allProducts)) return [];
    return allProducts.filter(product => favoriteIds.includes(product.$id));
  }, [allProducts, favoriteIds]);

  if (isLoading) {
    return <div className="loading-screen">Загрузка избранного...</div>;
  }

  return (
    <div className="favorites-screen">
      <h1>Избранные товары</h1>
      {favoriteProducts.length === 0 ? (
        <p className="favorites-empty">Вы еще ничего не добавили в избранное.</p>
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