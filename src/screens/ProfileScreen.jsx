import React from 'react';
import WebApp from '@twa-dev/sdk';

const ProfileScreen = () => {
  // Получаем данные пользователя из Telegram SDK
  const userData = WebApp.initDataUnsafe?.user;

  // Если приложение открыто не в Telegram, userData будет отсутствовать
  if (!userData) {
    return (
      <div className="profile-screen">
        <h1>Профиль</h1>
        <p>Не удалось загрузить данные пользователя. Пожалуйста, откройте приложение внутри Telegram.</p>
      </div>
    );
  }

  return (
    <div className="profile-screen">
      <h1>Профиль</h1>
      <div className="profile-info-card">
        <div className="info-row">
          <span>ID пользователя:</span>
          <strong>{userData.id}</strong>
        </div>
        <div className="info-row">
          <span>Имя:</span>
          <strong>{userData.first_name}</strong>
        </div>
        {userData.last_name && (
          <div className="info-row">
            <span>Фамилия:</span>
            <strong>{userData.last_name}</strong>
          </div>
        )}
        {userData.username && (
          <div className="info-row">
            <span>Username:</span>
            <strong>@{userData.username}</strong>
          </div>
        )}
        <div className="info-row">
          <span>Премиум-аккаунт:</span>
          <strong>{userData.is_premium ? 'Да' : 'Нет'}</strong>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;