import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [], 

  addToCart: (product) => {
    // ЖУЧОК №1: Проверяем, вызывается ли эта функция вообще
    console.log(`[STORE] Вызвана функция addToCart для товара: "${product.name}"`);

    set((state) => {
      const existingItem = state.items.find((item) => item.$id === product.$id);
      let newItems;

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.$id === product.$id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newItems = [...state.items, { ...product, quantity: 1 }];
      }

      // ЖУЧОК №2: Смотрим, каким стало состояние корзины ПОСЛЕ изменения
      console.log('[STORE] Новое состояние корзины:', newItems);
      
      return { items: newItems };
    });
  },

  removeFromCart: (productId) => set((state) => ({
    items: state.items
      .map((item) => {
        if (item.$id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0), 
  })),

  clearCart: () => set({ items: [] }),

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));