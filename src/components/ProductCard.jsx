import React from 'react';
import { useCartStore } from '../state/cartStore';
import { storage, PRODUCT_IMAGES_BUCKET_ID } from '../lib/appwrite';

const ProductCard = ({ product }) => {
  // --- ИЗМЕНЕНИЕ: Получаем каждый нужный нам кусок состояния отдельно ---
  const items = useCartStore((state) => state.items);
  const favorites = useCartStore((state) => state.favorites);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const toggleFavorite = useCartStore((state) => state.toggleFavorite);

  const itemInCart = items.find((item) => item.$id === product.$id);
  const isFavorite = favorites.includes(product.$id);

  let imageUrl = ''; 
  if (product && product.imageID) {
    try {
      const urlObject = storage.getFileView(PRODUCT_IMAGES_BUCKET_ID, product.imageID);
      imageUrl = urlObject.href;
    } catch (error) {
      console.error(`Could not get image URL for product ${product.name}`, error);
    }
  }

  return (
    <div className="product-card">
      <div className="product-image-container">
        <div className="favorite-icon" onClick={() => toggleFavorite(product.$id)}>
          <svg fill={isFavorite ? 'var(--active-color)' : '#fff'} width="24" height="24" viewBox="0 0 24 24"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>
        </div>
        <img src={imageUrl} alt={product.name} className="product-image" />
      </div>
      
      <h4>{product.name}</h4>
      <p>{product.price.toLocaleString('ru-RU')} сум</p>

      {!itemInCart ? (
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          +
        </button>
      ) : (
        <div className="quantity-selector">
          <button onClick={() => removeFromCart(product.$id)}>−</button>
          <span>{itemInCart.quantity}</span>
          <button onClick={() => addToCart(product)}>+</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;