import React from 'react';
import { Link } from 'react-router-dom';
import fetchCategories from '../api/categories.js'
import fetchBlog from '../api/blog.js'
import { Pagination } from '@mui/material';
const Blog = () => {
  // const [page, setPage] = useState(1);
  // const [selectedBrandId, setSelectedBrandId] = useState(null);
  // const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  // const [article, setArticle] = useState(null);
  // const { id } = useParams(); // Get the article ID from the URL
  // const itemsPerPage = 6;




  if (!article) return <div>Loading...</div>;
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
              <div className="col-lg-3 order-2 order-lg-1">
                <aside className="blog-sidebar-wrapper">
                  <div className="blog-sidebar">
                    <h5 className="title">search</h5>
                    <div className="sidebar-serch-form">
                      <form action="#">
                        <input
                          type="text"
                          className="search-field"
                          placeholder="search here"
                        />
                        <button type="submit" className="search-btn">
                          <i className="fa fa-search" />
                        </button>
                      </form>
                    </div>
                  </div>{" "}
                  {/* single sidebar end */}
                  <div className="blog-sidebar">
                    <h5 className="title">categories</h5>
                    <ul className="blog-archive blog-category">
                      <li>
                        <a href="#">Shoes (10)</a>
                      </li>
                      <li>
                        <a href="#">fashion (08)</a>
                      </li>
                      <li>
                        <a href="#">handbag (07)</a>
                      </li>
                      <li>
                        <a href="#">Jewelry (14)</a>
                      </li>
                      <li>
                        <a href="#">Kids (10)</a>
                      </li>
                    </ul>
                  </div>{" "}
                  {/* single sidebar end */}
                  <div className="blog-sidebar">
                    <h5 className="title">Blog Archives</h5>
                    <ul className="blog-archive">
                      <li>
                        <a href="#">January (10)</a>
                      </li>
                      <li>
                        <a href="#">February (08)</a>
                      </li>
                      <li>
                        <a href="#">March (07)</a>
                      </li>
                      <li>
                        <a href="#">April (14)</a>
                      </li>
                      <li>
                        <a href="#">May (10)</a>
                      </li>
                    </ul>
                  </div>{" "}
                  {/* single sidebar end */}
                  <div className="blog-sidebar">
                    <h5 className="title">recent post</h5>
                    <div className="recent-post">
                      <div className="recent-post-item">
                        <figure className="product-thumb">
                          <Link to="/blog_detail">
                            <img src="assets/img/blog/blog-1.jpg" alt="blog image" />
                          </Link>
                        </figure>
                        <div className="recent-post-description">
                          <div className="product-name">
                            <h6>
                              <Link to="/blog_detail">Auctor gravida enim</Link>
                            </h6>
                            <p>Mar 10 2021</p>
                          </div>
                        </div>
                      </div>
                      <div className="recent-post-item">
                        <figure className="product-thumb">
                          <Link to="/blog_detail">
                            <img src="assets/img/blog/blog-2.jpg" alt="blog image" />
                          </Link>
                        </figure>
                        <div className="recent-post-description">
                          <div className="product-name">
                            <h6>
                              <Link to="/blog_detail">gravida auctor dnim</Link>
                            </h6>
                            <p>Apr 18 2021</p>
                          </div>
                        </div>
                      </div>
                      <div className="recent-post-item">
                        <figure className="product-thumb">
                          <Link to="blog_detail">
                            <img src="assets/img/blog/blog-3.jpg" alt="blog image" />
                          </Link>
                        </figure>
                        <div className="recent-post-description">
                          <div className="product-name">
                            <h6>
                              <Link to="blog_detail">enim auctor gravida</Link>
                            </h6>
                            <p>Jun 14 2021</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  {/* single sidebar end */}
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
                      <li>
                        <a href="#">Phone</a>
                      </li>
                      <li>
                        <a href="#">Kids</a>
                      </li>
                    </ul>
                  </div>{" "}
                  {/* single sidebar end */}
                </aside>
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                <div className="blog-item-wrapper">
                  {/* blog item wrapper end */}
                  <div className="row mbn-30">
                    <div className="col-md-6">
                      {/* blog post item start */}
                      <div className="blog-post-item d-block mb-30">
                        <div className="blog-thumb w-100">
                          <Link to="blog_detail">
                            <img src="assets/img/blog/blog-1.jpg" alt="blog thumb" />
                          </Link>
                        </div>
                        <div className="blog-content w-100 pl-0 mt-20">
                          <h6 className="blog-title">
                            <Link to="blog_detail">This is First Post XipBlog</Link>
                          </h6>
                          <div className="blog-meta">
                            <span>
                              <i className="fa fa-calendar" />
                              Aug 05, 2021
                            </span>
                            <span>
                              <i className="fa fa-user" />
                              Admin
                            </span>
                          </div>
                          <p className="blog-desc">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. ...
                          </p>
                          <a className="btn read-more" href="blog-details.html">
                            Read More
                          </a>
                        </div>
                      </div>
                      {/* blog post item end */}
                    </div>
                 
                  </div>
                  {/* blog item wrapper end */}
                  {/* start pagination area */}
           
                  {/* end pagination area */}
                </div>
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