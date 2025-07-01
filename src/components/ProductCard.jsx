import React from 'react';
import { useCartStore } from '../state/cartStore';
import { storage, PRODUCT_IMAGES_BUCKET_ID } from '../lib/appwrite';

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart } = useCartStore();
  const items = useCartStore((state) => state.items);
  const itemInCart = items.find((item) => item.$id === product.$id);

  // --- ПОСЛЕДНЕЕ ИЗМЕНЕНИЕ: getFilePreview МЕНЯЕМ НА getFileView ---
  const imageUrl = storage.getFileView(PRODUCT_IMAGES_BUCKET_ID, product.imageID);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <img src={product.imageID} alt={product.name} className="product-image" />
      
      <h4>{product.name}</h4>
      <p>{product.price.toLocaleString('ru-RU')} сум</p>

      {!itemInCart ? (
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
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