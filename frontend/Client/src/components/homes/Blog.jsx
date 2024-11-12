import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles from the Laravel API
    axios.get('http://127.0.0.1:8000/api/Apiarticle')
      .then(response => {
        setArticles(response.data); // Store the articles in state
      })
      .catch(error => {
        console.error('There was an error fetching the articles!', error);
      });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section className="latest-blog-area section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center">
              <h3 className="title">TỪ BLOG CỦA CHÚNG TÔI</h3>
              <h4 className="sub-title">
                "Các cuộc điều tra đã chứng minh rằng người đọc dễ dàng đọc tôi hơn vì họ đọc thường xuyên hơn; sự rõ ràng cũng là một quá trình động, theo sau sự thay đổi."
              </h4>
            </div>
          </div>
        </div>
        <div className="row">
          {articles.slice(0,4).map((article) => (
            <div className="col-md-6 mb-4" key={article.id}>
              <div className="blog-post-item">
                <div className="blog-thumb">
                  <a href={`blog-details/${article.id}`}>
                    <img src={article.image_url} alt="blog thumb" />
                  </a>
                </div>
                <div className="blog-content">
                  <h6 className="blog-title">
                    <a href={`blog-details/${article.id}`}>{article.title}</a>
                  </h6>
                  <div className="blog-meta">
                    <span><i className="fa fa-calendar" /> {new Date(article.created_at).toLocaleDateString()}</span>
                    {/* <span><i className="fa fa-user" /> {article.author}</span> */}
                  </div>
                  <p className="blog-desc">
                    {article.excerpt}
                  </p>
                  <a className="btn read-more" href={`blog-details/${article.id}`}>Read More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
