import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To get the ID from the URL

const BlogDetail = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams(); // Get the article ID from the URL

  useEffect(() => {
    // Fetch the article details based on the ID
    axios.get(`http://127.0.0.1:8000/api/Apiarticle/${id}`)
      .then(response => {
        setArticle(response.data); // Store the article data
      })
      .catch(error => {
        console.error('There was an error fetching the article!', error);
      });
  }, [id]); // Re-fetch if ID changes

  if (!article) return <div>Loading...</div>;

  return (
    <section className="blog-detail-area section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center">
              <h3 className="title">{article.title}</h3>
              <div className="blog-meta">
                <span><i className="fa fa-calendar" /> {new Date(article.created_at).toLocaleDateString()}</span>
                <span><i className="fa fa-user" /> {article.author}</span>
              </div>
            </div>
            <div className="blog-content">
              <img src={article.image_url} alt="blog thumb" />
              <p>{article.content}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
