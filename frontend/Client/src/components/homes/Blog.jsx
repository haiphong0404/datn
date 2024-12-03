import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogMain = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles from the Laravel API
    axios.get('http://127.0.0.1:8000/api/Apiarticles')
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
              <h3 className="title">BÀI VIẾT CỦA CHÚNG TÔI</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {articles.slice(0,4).map((article) => (
            <div className="col-md-6 mb-4" key={article.id}>
              <div className="blog-post-item">
                <div className="blog-thumb">
                  <Link to={`/blog_details/${article.id}`}>
                    <img src={article.image || '/path/to/placeholder.jpg'} alt="blog thumb"
                     style={{
                      display: 'block',
                      margin: '0 auto',
                      width: '300px', // Đặt chiều rộng mong muốn
                      height: '170px', // Đặt chiều cao mong muốn
                      objectFit: 'cover', // Cắt ảnh để phù hợp với kích thước mà không bị méo
                    }} />
                  </Link>
                </div>
                <div className="blog-content">
                  <h6 className="blog-title">
                    <Link to={`/blog_details/${article.id}`}>{article.title.substring(0, 20)}</Link>
                  </h6>
                  <div className="blog-meta">
                    <span><i className="fa fa-calendar" /> {new Date(article.created_at).toLocaleDateString()}</span>
                    {/* <span><i className="fa fa-user" /> {article.author}</span> */}
                  </div>
                  <p className="blog-desc">
                    {article.excerpt}
                  </p>
                  <Link className="btn read-more" to={`/blog_details/${article.id}`}>Read More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogMain;
