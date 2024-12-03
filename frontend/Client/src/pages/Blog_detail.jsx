import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To get the ID from the URL
import { Link } from 'react-router-dom';
import LoadingSpinner from "../loading/LoadingSpinner"; 

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

  if (loading)  return <LoadingSpinner />;;
  if (error) return <div>{error}</div>;

  return (
    <div>
        <div
          className="breadcrumb-area breadcrumb-img bg-img"
          style={{ backgroundImage: "url(/assets/img/banner/shop.jpg)" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-wrap">
                  <nav aria-label="breadcrumb">
                    <h3 className="breadcrumb-title">BLOG DETAILS</h3>
                    <ul className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <a href="index.html">
                          
                          <Link to="/">
                          <i className="fa fa-home" /></Link>
                        </a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                      
                          <Link to="/blog">
                            Blog</Link>
                        
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Blog Details
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
    <section className="blog-detail-area section-padding">
      <div className="container">
        <div className="row">
          <div className="blog-post-item blog-details-post d-block">
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
      </div>
    </section>
    </div>
  );
};

export default BlogDetail;
