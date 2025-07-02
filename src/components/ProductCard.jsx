import React from 'react';

// ЭТО ВРЕМЕННАЯ, МАКСИМАЛЬНО УПРОЩЕННАЯ ВЕРСИЯ ДЛЯ ТЕСТА СБОРКИ
const ProductCard = ({ product }) => {

  // Мы убрали всю логику: получение картинки, подключение к корзине и т.д.
  // Мы просто отображаем данные, которые приходят в компонент.

  return (
    <div className="product-card">
      <div className="product-image-container">
        {/* Картинку пока не показываем */}
      </div>
      
      <h4>{product ? product.name : 'Название товара'}</h4>
      <p>{product ? product.price.toLocaleString('ru-RU') : '0'} сум</p>

      {/* Кнопка пока ничего не делает */}
      <button className="add-to-cart-btn">+</button>
    </div>
  );
};

export default ProductCard;
