import { create } from 'zustand';

// --- Логика для сохранения и загрузки избранного из памяти телефона ---
const loadFavoritesFromStorage = () => {
  try {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Could not load favorites from local storage", error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error("Could not save favorites to local storage", error);
  }
};


export const useCartStore = create((set, get) => ({
  items: [],
  favorites: loadFavoritesFromStorage(), // Загружаем избранное при инициализации

  // --- Действия с избранным ---
  toggleFavorite: (productId) => {
    const favorites = get().favorites;
    const newFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId) // Удалить, если уже есть
      : [...favorites, productId]; // Добавить, если нет

    saveFavoritesToStorage(newFavorites); // Сохраняем в память
    set({ favorites: newFavorites }); // Обновляем состояние
  },

  // --- Действия с корзиной (остаются без изменений) ---
  addToCart: (product) => set((state) => {
    const existingItem = state.items.find((item) => item.$id === product.$id);
    if (existingItem) {
      return {
        items: state.items.map((item) =>
          item.$id === product.$id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    } else {
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
      .filter((item) => item.quantity > 0),
  })),

  clearCart: () => set({ items: [] }),
  
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));