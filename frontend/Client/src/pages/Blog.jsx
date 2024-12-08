import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from '@mui/material';
import useGetAllArticles from '../hooks/useGetAllBlogs ';
import LoadingSpinner from "../loading/LoadingSpinner"; 

const Blog = () => {
  const { articles, loading, error } = useGetAllArticles();
  const itemsPerPage = 6; // Số bài viết mỗi trang
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(articles);

  useEffect(() => {
    // Khi articles thay đổi, reset lại filteredArticles
    setFilteredArticles(articles);
  }, [articles]);

  if (loading)  return <LoadingSpinner />;;
  if (error) return <div>{error}</div>;

  // Tính tổng số trang dựa trên filteredArticles
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  // Xác định bài viết của trang hiện tại
  const displayedArticles = filteredArticles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Hàm thay đổi trang
  const handleChange = (event, value) => {
    setPage(value);
  };

  // Hàm tìm kiếm khi nhập
  const handleSearch = (event) => {
    const lowerCaseTerm = event.target.value.toLowerCase();
    setSearchTerm(lowerCaseTerm);
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(lowerCaseTerm) ||
      article.content.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredArticles(filtered);
    setPage(1); // Reset về trang đầu tiên sau khi tìm kiếm
  };


  return (
    <div>
      <main>
        {/* breadcrumb area start */}
        <div
          className="breadcrumb-area breadcrumb-img bg-img"
          style={{
            backgroundImage: "url(/assets/img/banner/shop.jpg)",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-wrap">
                  <nav aria-label="breadcrumb">
                    <h3 className="breadcrumb-title">TIN TỨC</h3>
                    <ul className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <a href="index.html">
                          <i className="fa fa-home" />
                        </a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Tin tức
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* breadcrumb area end */}

        {/* blog main wrapper start */}
        <div className="blog-main-wrapper section-padding">
          <div className="container">
            <div className="row">
              {/* Sidebar */}
              <div className="col-lg-3 order-2 order-lg-1">
                <aside className="blog-sidebar-wrapper">
                  <div className="blog-sidebar">
                    <h5 className="title">Search</h5>
                    <div className="sidebar-serch-form">
                      <input
                        type="text"
                        className="search-field"
                        placeholder="Search here"
                        value={searchTerm}
                        onChange={handleSearch} // Cập nhật tìm kiếm mỗi khi gõ
                      />
                        
                        <button type="submit" className="search-btn">
                          <i className="fa fa-search" />
                        </button>
                    </div>
                  </div>

                  <div className="blog-sidebar">
                    <h5 className="title">recent post</h5>
                    <div className="recent-post">
                      {articles.slice(0, 3).map((article) => {
                        const limitedTitle = article.title?.length > 30
                          ? `${article.title.substring(0, 30)}...` // Giới hạn tiêu đề dài hơn 30 ký tự
                          : article.title || 'No Title';

                        return (
                          <div key={article.id} className="recent-post-item">
                            <figure className="product-thumb">
                              <Link to={`/blog_details/${article.id}`}>
                                <img src={article.image || 'assets/img/blog/default.jpg'} alt="Article Image" />
                              </Link>
                            </figure>
                            <div className="recent-post-description">
                              <div className="product-name">
                                <h6>
                                  <Link to={`/blog_details/${article.id}`}>{limitedTitle}</Link>
                                </h6>
                                <p>{new Date(article.created_at).toLocaleDateString('en-GB')}</p> {/* Định dạng ngày dd/mm/yyyy */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </aside>
              </div>

              {/* Blog Content */}
              <div className="col-lg-9 order-1 order-lg-2">
                <div className="blog-item-wrapper">
                  <div className="row mbn-30">
                    {filteredArticles.length > 0 ? (
                      displayedArticles.map((article) => (
                        <div key={article.id} className="col-md-6">
                          <div className="blog-post-item d-block mb-30">
                            <div className="blog-thumb w-100">
                              <Link to={`/blog_details/${article.id}`}>
                                <img
                                  src={article.image || "assets/img/blog/default.jpg"}
                                  alt={article.name}
                                  style={{
                                    display: 'block',
                                    margin: '0 auto',
                                    width: '300px', // Đặt chiều rộng mong muốn
                                    height: '200px', // Đặt chiều cao mong muốn
                                    objectFit: 'cover', // Cắt ảnh để phù hợp với kích thước mà không bị méo
                                  }}
                                />
                              </Link>
                            </div>
                            <div className="blog-content w-100 pl-0 mt-20">
                              <h6 className="blog-title">
                                <Link to={`/blog_details/${article.id}`}>
                                  {article.title}
                                </Link>
                              </h6>
                              <div className="blog-meta">
                                <span>
                                  <i className="fa fa-calendar" /> {formatDate(article.created_at)}
                                </span>
                                <span>
                                  <i className="fa fa-user" />{" "}
                                  {article.name || "Unknown"}
                                </span>
                              </div>
                              <p className="blog-desc">
                                {article.content.substring(0, 40) || "No description available."}
                              </p>
                              <Link
                                className="btn read-more"
                                to={`/blog_details/${article.id}`}
                              >
                                
                                Read More
                              </Link>
                              
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Không có bài viết nào phù hợp với kết quả tìm kiếm.</p>
                    )}
                  </div>
                </div>

                {/* Pagination */}
                {filteredArticles.length > 0 && (
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
                    className="pagination"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 4,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* blog main wrapper end */}
      </main>
    </div>
  );
};

export default Blog;
