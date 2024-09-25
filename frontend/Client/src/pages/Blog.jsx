import React from 'react';

const Blog = () => {
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
                    <a href="blog-details.html">
                      <img src="assets/img/blog/blog-1.jpg" alt="blog image" />
                    </a>
                  </figure>
                  <div className="recent-post-description">
                    <div className="product-name">
                      <h6>
                        <a href="blog-details.html">Auctor gravida enim</a>
                      </h6>
                      <p>Mar 10 2021</p>
                    </div>
                  </div>
                </div>
                <div className="recent-post-item">
                  <figure className="product-thumb">
                    <a href="blog-details.html">
                      <img src="assets/img/blog/blog-2.jpg" alt="blog image" />
                    </a>
                  </figure>
                  <div className="recent-post-description">
                    <div className="product-name">
                      <h6>
                        <a href="blog-details.html">gravida auctor dnim</a>
                      </h6>
                      <p>Apr 18 2021</p>
                    </div>
                  </div>
                </div>
                <div className="recent-post-item">
                  <figure className="product-thumb">
                    <a href="blog-details.html">
                      <img src="assets/img/blog/blog-3.jpg" alt="blog image" />
                    </a>
                  </figure>
                  <div className="recent-post-description">
                    <div className="product-name">
                      <h6>
                        <a href="blog-details.html">enim auctor gravida</a>
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
                    <a href="blog-details.html">
                      <img src="assets/img/blog/blog-1.jpg" alt="blog thumb" />
                    </a>
                  </div>
                  <div className="blog-content w-100 pl-0 mt-20">
                    <h6 className="blog-title">
                      <a href="blog-details.html">This is First Post XipBlog</a>
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
              <div className="col-md-6">
                {/* blog post item start */}
                <div className="blog-post-item d-block mb-30">
                  <div className="blog-thumb w-100">
                    <div className="blog-carousel-2 slick-row-5 slick-dot-style">
                      <div className="blog-single-slide">
                        <a href="blog-details.html">
                          <img
                            src="assets/img/blog/blog-2.jpg"
                            alt="blog image"
                          />
                        </a>
                      </div>
                      <div className="blog-single-slide">
                        <a href="blog-details.html">
                          <img
                            src="assets/img/blog/blog-3.jpg"
                            alt="blog image"
                          />
                        </a>
                      </div>
                      <div className="blog-single-slide">
                        <a href="blog-details.html">
                          <img
                            src="assets/img/blog/blog-4.jpg"
                            alt="blog image"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="blog-content w-100 pl-0 mt-20">
                    <h6 className="blog-title">
                      <a href="blog-details.html">
                        This is Second Post XipBlog
                      </a>
                    </h6>
                    <div className="blog-meta">
                      <span>
                        <i className="fa fa-calendar" />
                        May 10, 2021
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
              <div className="col-md-6">
                {/* blog post item start */}
                <div className="blog-post-item d-block mb-30">
                  <div className="blog-thumb ratio ratio-16x9 w-100">
                    <iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/501298839&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
                  </div>
                  <div className="blog-content w-100 pl-0 mt-20">
                    <h6 className="blog-title">
                      <a href="blog-details.html">This is Third Post XipBlog</a>
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
              <div className="col-md-6">
                {/* blog post item start */}
                <div className="blog-post-item d-block mb-30">
                  <div className="blog-thumb ratio ratio-16x9 w-100">
                    <iframe
                      src="https://www.youtube.com/embed/WeA7edXsU40"
                      allow="autoplay; encrypted-media"
                      allowFullScreen=""
                    />
                  </div>
                  <div className="blog-content w-100 pl-0 mt-20">
                    <h6 className="blog-title">
                      <a href="blog-details.html">
                        This is Fourth Post XipBlog
                      </a>
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
              <div className="col-md-6">
                {/* blog post item start */}
                <div className="blog-post-item d-block mb-30">
                  <div className="blog-thumb w-100">
                    <a href="blog-details.html">
                      <img src="assets/img/blog/blog-3.jpg" alt="blog thumb" />
                    </a>
                  </div>
                  <div className="blog-content w-100 pl-0 mt-20">
                    <h6 className="blog-title">
                      <a href="blog-details.html">This is fifth Post XipBlog</a>
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
              <div className="col-md-6">
                {/* blog post item start */}
                <div className="blog-post-item d-block mb-30">
                  <div className="blog-thumb w-100">
                    <a href="blog-details.html">
                      <img src="assets/img/blog/blog-4.jpg" alt="blog thumb" />
                    </a>
                  </div>
                  <div className="blog-content w-100 pl-0 mt-20">
                    <h6 className="blog-title">
                      <a href="blog-details.html">
                        This is Seventh Post XipBlog
                      </a>
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
            <div className="paginatoin-area shadow-bg text-center">
              <ul className="pagination-box">
                <li>
                  <a className="previous" href="#">
                    <i className="fa fa-angle-left" />
                  </a>
                </li>
                <li className="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a className="next" href="#">
                    <i className="fa fa-angle-right" />
                  </a>
                </li>
              </ul>
            </div>
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