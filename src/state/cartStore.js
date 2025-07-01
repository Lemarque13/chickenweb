import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [], // Массив товаров в корзине: [{...product, quantity: N}]

  // --- Основные действия с корзиной ---

  addToCart: (product) => set((state) => {
    const existingItem = state.items.find((item) => item.$id === product.$id);
    if (existingItem) {
      // Если товар уже есть, увеличиваем количество
      return {
        items: state.items.map((item) =>
          item.$id === product.$id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    } else {
      // Если товара нет, добавляем с количеством 1
      return { items: [...state.items, { ...product, quantity: 1 }] };
    }
  }),

  removeFromCart: (productId) => set((state) => ({
    items: state.items
      .map((item) => {
        if (item.$id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0), // Удаляем товар, если количество стало 0
  })),

  clearCart: () => set({ items: [] }),

  // --- Вспомогательные функции для получения данных ---
  
  // Эта функция считает общую сумму всех товаров в корзине
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));