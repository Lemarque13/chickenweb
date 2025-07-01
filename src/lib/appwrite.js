import { Client, Databases, Storage } from 'appwrite';

const APPWRITE_ENDPOINT = 'https://fra.cloud.appwrite.io/v1'; 
const APPWRITE_PROJECT_ID = '6863d2f000114af88d7f'; 

export const client = new Client();
client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = '6863d346000a815c6808';
export const PRODUCTS_COLLECTION_ID = 'Products';
export const CATEGORIES_COLLECTION_ID = 'Categories';

// УБЕДИТЕСЬ, ЧТО ЗДЕСЬ СТОИТ ПРАВИЛЬНЫЙ ID, А НЕ 'product-images'
export const PRODUCT_IMAGES_BUCKET_ID = '6863d354a002bb4ca973';