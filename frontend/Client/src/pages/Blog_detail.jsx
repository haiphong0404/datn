import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To get the ID from the URL

const BlogDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy bài viết chi tiết từ API
  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/Apiarticle/${id}`);
        const data = await response.json();
        setArticle(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load article details');
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [id]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="blog-detail-area section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center">
              <h3 className="title">{article.title}</h3>
              <div className="blog-meta">
                <span><i className="fa fa-calendar" /> {new Date(article.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="blog-content">
              <img src={article.image} alt="blog thumb" />
              <p>{article.content}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
