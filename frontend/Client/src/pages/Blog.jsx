import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGetAllBlogs from '../hooks/useGetAllBlogs ';
import { Pagination } from '@mui/material';

const Blog = () => {
  const { blogs, loading, error } = useGetAllBlogs();
  const itemsPerPage = 6; // Số bài viết mỗi trang
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  useEffect(() => {
    // Khi blogs thay đổi, reset lại filteredBlogs
    setFilteredBlogs(blogs);
  }, [blogs]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  // Tính tổng số trang dựa trên filteredBlogs
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  // Xác định bài viết của trang hiện tại
  const displayedBlogs = filteredBlogs.slice(
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
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(lowerCaseTerm) ||
      blog.content.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredBlogs(filtered);
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
                    <h3 className="breadcrumb-title">BLOG</h3>
                    <ul className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <a href="index.html">
                          <i className="fa fa-home" />
                        </a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Blog
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
                      {blogs.slice(0, 3).map((blog) => {
                        const limitedTitle = blog.title?.length > 30
                          ? `${blog.title.substring(0, 30)}...` // Giới hạn tiêu đề dài hơn 30 ký tự
                          : blog.title || 'No Title';

                        return (
                          <div key={blog.id} className="recent-post-item">
                            <figure className="product-thumb">
                              <Link to={`/blog_detail/${blog.id}`}>
                                <img src={blog.image || 'assets/img/blog/default.jpg'} alt="Blog Image" />
                              </Link>
                            </figure>
                            <div className="recent-post-description">
                              <div className="product-name">
                                <h6>
                                  <Link to={`/blog_detail/${blog.id}`}>{limitedTitle}</Link>
                                </h6>
                                <p>{new Date(blog.created_at).toLocaleDateString('en-GB')}</p> {/* Định dạng ngày dd/mm/yyyy */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="blog-sidebar">
                    <h5 className="title">Tags</h5>
                    <ul className="blog-tags">
                      <li>
                        <a href="#">Shoes</a>
                      </li>
                      <li>
                        <a href="#">Fashion</a>
                      </li>
                      <li>
                        <a href="#">Bags</a>
                      </li>
                      <li>
                        <a href="#">Watch</a>
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>

              {/* Blog Content */}
              <div className="col-lg-9 order-1 order-lg-2">
                <div className="blog-item-wrapper">
                  <div className="row mbn-30">
                    {filteredBlogs.length > 0 ? (
                      displayedBlogs.map((blog) => (
                        <div key={blog.id} className="col-md-6">
                          <div className="blog-post-item d-block mb-30">
                            <div className="blog-thumb w-100">
                              <Link to={`/blog_detail/${blog.id}`}>
                                <img
                                  src={blog.image || "assets/img/blog/default.jpg"}
                                  alt={blog.name}
                                />
                              </Link>
                            </div>
                            <div className="blog-content w-100 pl-0 mt-20">
                              <h6 className="blog-title">
                                <Link to={`/blog_detail/${blog.id}`}>
                                  {blog.title}
                                </Link>
                              </h6>
                              <div className="blog-meta">
                                <span>
                                  <i className="fa fa-calendar" /> {formatDate(blog.created_at)}
                                </span>
                                <span>
                                  <i className="fa fa-user" />{" "}
                                  {blog.name || "Unknown"}
                                </span>
                              </div>
                              <p className="blog-desc">
                                {blog.content || "No description available."}
                              </p>
                              <Link
                                className="btn read-more"
                                to={`/blog_detail/${blog.id}`}
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
                {filteredBlogs.length > 0 && (
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
