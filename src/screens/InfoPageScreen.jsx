import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { databases, DATABASE_ID, INFO_PAGES_COLLECTION_ID, Query } from '../lib/appwrite';

const InfoPageScreen = () => {
  const { slug } = useParams(); // Получаем slug из URL, например, 'about-us'
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      setIsLoading(true);
      try {
        // Ищем документ, у которого поле 'slug' равно тому, что в URL
        const response = await databases.listDocuments(
          DATABASE_ID, 
          INFO_PAGES_COLLECTION_ID,
          [Query.equal('slug', slug)]
        );
        if (response.documents.length > 0) {
          setPage(response.documents[0]);
        } else {
          setPage(null); // Страница не найдена
        }
      } catch (error) {
        console.error("Failed to fetch page content", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage();
  }, [slug]); // Перезагружаем данные каждый раз, когда меняется slug в URL

  if (isLoading) {
    return <div className="loading-screen">Загрузка страницы...</div>;
  }

  if (!page) {
    return (
      <div className="info-page">
        <h1>Страница не найдена</h1>
        <Link to="/">Вернуться на главную</Link>
      </div>
    );
  }

  return (
    <div className="info-page">
      <h1>{page.title}</h1>
      {/* Используем dangerouslySetInnerHTML, если вы доверяете контенту в вашей БД (например, хотите использовать HTML-теги) */}
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
};

export default InfoPageScreen;