import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Основные стили
import { BrowserRouter } from 'react-router-dom'; // Для роутинга

console.log('--- [DEBUG-Main] Starting React application (main.jsx) ---'); // DEBUG: Первый лог

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
  console.log('--- [DEBUG-Main] ReactDOM.render called successfully ---'); // DEBUG: Успешный лог
} catch (error) {
  // Этот блок поймает любую ошибку, которая произошла во время первой отрисовки React
  console.error('--- [FATAL ERROR caught in main.jsx] An uncaught error occurred during initial render ---', error); // DEBUG: Ловим фатальную ошибку
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="text-align: center; padding: 50px; color: red;">
        <h1>Ошибка при запуске приложения</h1>
        <p>Пожалуйста, попробуйте обновить страницу или свяжитесь с поддержкой.</p>
        <p>Детали ошибки:</p>
        <pre style="text-align: left; background: #333; color: white; padding: 10px; border-radius: 5px; overflow-x: auto; white-space: pre-wrap;">${error.stack || error.message}</pre>
      </div>
    `;
  }
}