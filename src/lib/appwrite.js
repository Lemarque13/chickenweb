import { Client, Databases, Storage, Query, ID } from 'appwrite';

// --- ОСНОВНЫЕ НАСТРОЙКИ ПОДКЛЮЧЕНИЯ ---
const APPWRITE_ENDPOINT = 'https://fra.cloud.appwrite.io/v1'; 
const APPWRITE_PROJECT_ID = '6863d2f000114af88d7f'; 

// --- ИНИЦИАЛИЗАЦИЯ СЕРВИСОВ ---
export const client = new Client();
client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID, Query }; // Экспортируем утилиты для запросов и создания ID

// --- ID РЕСУРСОВ В APPWRITE ---

// ID Базы данных
export const DATABASE_ID = '6863d346000a815c6808';

// ID Коллекций
export const PRODUCTS_COLLECTION_ID = 'Products';
export const CATEGORIES_COLLECTION_ID = 'Categories';
export const INFO_PAGES_COLLECTION_ID = 'InfoPages';
export const ORDERS_COLLECTION_ID = 'Orders';

// ID Хранилища (Bucket)
export const PRODUCT_IMAGES_BUCKET_ID = '6863d354a002bb4ca973';