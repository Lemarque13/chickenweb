import { Client, Databases, Storage, Query, ID } from 'appwrite';

// --- ОСНОВНЫЕ НАСТРОЙКИ ПОДКЛЮЧЕНИЯ ---
export const APPWRITE_ENDPOINT = 'https://fra.cloud.appwrite.io/v1'; 
export const APPWRITE_PROJECT_ID = '6863d2f000114af88d7f'; // <--- ВАШ РЕАЛЬНЫЙ ID ПРОЕКТА Appwrite

// --- ИНИЦИАЛИЗАЦИЯ СЕРВИСОВ ---
let clientInstance = null; 
let databasesInstance = null;
let storageInstance = null;

try {
  if (!APPWRITE_PROJECT_ID || !APPWRITE_ENDPOINT) {
    console.error('[FATAL ERROR-Appwrite] Appwrite Project ID or Endpoint is missing! Please check lib/appwrite.js');
  } else {
    clientInstance = new Client();
    clientInstance.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);
    console.log('[DEBUG-Appwrite] Appwrite Client instance created and configured.');

    // Дополнительная проверка статуса после установки конфигурации
    // clientInstance.call() - это простой способ проверить соединение (для диагностики)
    // В продакшене это не обязательно, но для дебага полезно
    // try {
    //   await clientInstance.call('GET', '/health'); // Проверка здоровья сервера Appwrite
    //   console.log('[DEBUG-Appwrite] Appwrite server is reachable.');
    // } catch (healthError) {
    //   console.error('[DEBUG-Appwrite] Appwrite server is NOT reachable or health check failed:', healthError);
    //   // Возможно, стоит вывести пользователю сообщение о проблемах с сервером
    // }

    databasesInstance = new Databases(clientInstance);
    storageInstance = new Storage(clientInstance);

    console.log('[DEBUG-Appwrite] Databases and Storage services instantiated.');
  }
} catch (e) {
  console.error('[FATAL ERROR-Appwrite] Appwrite SDK initialization failed:', e); 
}

// Экспортируем все необходимые объекты ОДИН РАЗ в конце файла
export { 
  clientInstance as client, 
  databasesInstance as databases, 
  storageInstance as storage,     
  ID, 
  Query 
};

// --- ID РЕСУРСОВ В APPWRITE ---
export const DATABASE_ID = '6863d346000a815c6808';       
export const PRODUCTS_COLLECTION_ID = 'Products';           
export const CATEGORIES_COLLECTION_ID = 'Categories';       
export const INFO_PAGES_COLLECTION_ID = 'InfoPages';        
export const ORDERS_COLLECTION_ID = 'Orders';               
export const PRODUCT_IMAGES_BUCKET_ID = '6863d354a002bb4ca973';