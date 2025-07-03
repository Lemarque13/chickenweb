import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { databases, DATABASE_ID, PRODUCTS_COLLECTION_ID } from '../lib/appwrite';
import { useCartStore } from '../state/cartStore'; // Для корзины

const ProductDetailScreen = () => {
  const { productId } = useParams(); // Получаем ID продукта из URL
  const navigate = useNavigate(); // Для кнопки "Назад"

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получаем функции и состояние корзины
  const { items, addToCart, removeFromCart } = useCartStore();
  const itemInCart = items.find((item) => item.$id === product?.$id); // Проверяем, есть ли товар в корзине

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) {
          setError("ID продукта не указан.");
          setIsLoading(false);
          return;
        }
        if (!databases || !DATABASE_ID || !PRODUCTS_COLLECTION_ID) {
          setError("Ошибка конфигурации Appwrite.");
          setIsLoading(false);
          return;
        }

        const response = await databases.getDocument(
          DATABASE_ID,
          PRODUCTS_COLLECTION_ID,
          productId
        );
        setProduct(response);
      } catch (err) {
        console.error("Ошибка при загрузке продукта:", err);
        setError("Не удалось загрузить информацию о товаре.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // Зависимость от productId, чтобы перерисовывать при смене продукта

  if (isLoading) {
    return <div className="loading-screen">Загрузка информации о товаре...</div>;
  }

  if (error) {
    return (
      <div className="error-screen">
        <p>{error}</p>
        <button onClick={() => navigate('/')}>На главную</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="no-results">
        <p>Товар не найден.</p>
        <button onClick={() => navigate('/')}>На главную</button>
      </div>
    );
  }

  // Получаем полную ссылку на изображение (как мы уже договорились)
  const imageUrl = product.imageID;

  return (
    <div className="product-detail-screen">
      <button onClick={() => navigate(-1)} className="back-button">← Назад</button>
      
      <div className="product-detail-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} className="product-detail-image" />
        ) : (
          <div className="product-detail-image-placeholder">Нет изображения</div>
        )}
      </div>

      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="product-detail-price">{product.price.toLocaleString('ru-RU')} сум</p>
        <p className="product-detail-description">{product.description || 'Описание отсутствует.'}</p>

        <div className="product-detail-cart-controls">
          {!itemInCart ? (
            <button className="add-to-cart-btn-detail" onClick={() => addToCart(product)}>
              Добавить в корзину
            </button>
          ) : (
            <div className="quantity-selector-detail">
              <button onClick={() => removeFromCart(product.$id)}>−</button>
              <span>{itemInCart.quantity}</span>
              <button onClick={() => addToCart(product)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;