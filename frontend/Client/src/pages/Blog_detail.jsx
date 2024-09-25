import React from 'react';

const blog_detail = () => {
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
                    <h3 className="breadcrumb-title">BLOG DETAILS</h3>
                    <ul className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <a href="index.html">
                          <i className="fa fa-home" />
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="blog-left-sidebar.html">Blog</a>
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
        {/* breadcrumb area end */}
        {/* blog main wrapper start */}
        <div className="blog-main-wrapper section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2">
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
                            <img src="/assets/img/blog/blog-1.jpg" alt="blog image" />
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
                            <img src="
/assets/img/blog
/blog-2.jpg" alt="blog image" />
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
                            <img src="
/assets/img/blog
/blog-3.jpg" alt="blog image" />
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
              <div className="col-lg-9 order-1">
                <div className="blog-item-wrapper">
                  {/* blog post item start */}
                  <div className="blog-post-item blog-details-post d-block">
                    <figure className="blog-thumb w-100">
                      <div className="blog-carousel-2 slick-row-5 slick-dot-style">
                        <div className="blog-single-slide">
                          <img src="
/assets/img/blog
/blog-1.jpg" alt="blog image" />
                        </div>
                        <div className="blog-single-slide">
                          <img src="
/assets/img/blog
/blog-2.jpg" alt="blog image" />
                        </div>
                        <div className="blog-single-slide">
                          <img src="
/assets/img/blog
/blog-3.jpg" alt="blog image" />
                        </div>
                      </div>
                    </figure>
                    <div className="blog-content w-100 mt-20 pl-0">
                      <h3 className="blog-title">
                        Celebrity Daughter Opens Up About Having
                      </h3>
                      <div className="blog-meta">
                        <p>
                          25/03/2021 | <a href="#">Pullman</a>
                        </p>
                      </div>
                      <div className="entry-summary">
                        <p>
                          {" "}
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                          Voluptate perferendis consequuntur illo aliquid nihil ad
                          neque, debitis praesentium libero ullam asperiores
                          exercitationem deserunt inventore facilis, officiis,
                        </p>
                        <blockquote>
                          <p>
                            Quisque semper nunc vitae erat pellentesque, ac placerat
                            arcu consectetur. venenatis elit ac ultrices convallis.
                            Duis est nisi, tincidunt ac urna sed, cursus blandit
                            lectus. In ullamcorper sit amet ligula ut eleifend. Proin
                            dictum tempor ligula, ac feugiat metus. Sed finibus tortor
                            eu scelerisque scelerisque.
                          </p>
                        </blockquote>
                        <p>
                          aliquam maiores asperiores recusandae commodi blanditiis
                          ipsum tempora culpa possimus assumenda ab quidem a
                          voluptatum quia natus? Ex neque, saepe reiciendis quasi
                          velit perspiciatis error vel quas quibusdam autem nesciunt
                          voluptas odit quis dignissimos eos aspernatur voluptatum est
                          repellat. Pariatur praesentium, corrupti deserunt ducimus
                          quo doloremque nostrum aspernatur saepe cupiditate sit autem
                          exercitationem debitis, maiores vitae perferendis nemo?
                          Voluptas illo, animi temporibus quod earum molestias eaque,
                          iure rem amet autem dignissimos officia dolores numquam
                          distinctio esse voluptates optio pariatur aspernatur omnis?
                        </p>
                        <div className="tag-line">
                          <h6>Tag :</h6>
                          <a href="#">Necklaces</a>,<a href="#">Earrings</a>,
                          <a href="#">Jewellery</a>,
                        </div>
                        <div className="blog-share-link">
                          <h6>Share :</h6>
                          <div className="blog-social-icon">
                            <a href="#" className="facebook">
                              <i className="fa fa-facebook" />
                            </a>
                            <a href="#" className="twitter">
                              <i className="fa fa-twitter" />
                            </a>
                            <a href="#" className="pinterest">
                              <i className="fa fa-pinterest" />
                            </a>
                            <a href="#" className="google">
                              <i className="fa fa-google-plus" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* blog post item end */}
                  {/* comment area start */}
                  <div className="comment-section section-padding">
                    <div className="blog-bg">
                      <h5>03 Comment</h5>
                      <ul>
                        <li>
                          <div className="author-avatar">
                            <img src="
/assets/img/blog
/comment-icon.png" alt="" />
                          </div>
                          <div className="comment-body">
                            <span className="reply-btn">
                              <a href="#">Reply</a>
                            </span>
                            <h5 className="comment-author">Admin</h5>
                            <div className="comment-post-date">
                              15 Dec, 2021 at 9:30pm
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit.
                              Enim maiores adipisci optio ex, laboriosam facilis non
                              pariatur itaque illo sunt?
                            </p>
                          </div>
                        </li>
                        <li className="comment-children">
                          <div className="author-avatar">
                            <img src="
/assets/img/blog
/comment-icon.png" alt="" />
                          </div>
                          <div className="comment-body">
                            <span className="reply-btn">
                              <a href="#">Reply</a>
                            </span>
                            <h5 className="comment-author">Admin</h5>
                            <div className="comment-post-date">
                              20 Nov, 2021 at 9:30pm
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit.
                              Enim maiores adipisci optio ex, laboriosam facilis non
                              pariatur itaque illo sunt?
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="author-avatar">
                            <img src="
/assets/img/blog
/comment-icon.png" alt="" />
                          </div>
                          <div className="comment-body">
                            <span className="reply-btn">
                              <a href="#">Reply</a>
                            </span>
                            <h5 className="comment-author">Admin</h5>
                            <div className="comment-post-date">
                              25 Jan, 2021 at 9:30pm
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit.
                              Enim maiores adipisci optio ex, laboriosam facilis non
                              pariatur itaque illo sunt?
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* comment area end */}
                  {/* start blog comment box */}
                  <div className="blog-comment-wrapper">
                    <h5>Leave A Reply</h5>
                    <p>
                      Your email address will not be published. Required fields are
                      marked *
                    </p>
                    <form action="#">
                      <div className="comment-post-box">
                        <div className="row">
                          <div className="col-12">
                            <label>Comment</label>
                            <textarea
                              name="commnet"
                              placeholder="Write a comment"
                              defaultValue={""}
                            />
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <label>Name</label>
                            <input
                              type="text"
                              className="coment-field"
                              placeholder="Name"
                            />
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <label>Email</label>
                            <input
                              type="text"
                              className="coment-field"
                              placeholder="Email"
                            />
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <label>Website</label>
                            <input
                              type="text"
                              className="coment-field"
                              placeholder="Website"
                            />
                          </div>
                          <div className="col-12">
                            <div className="coment-btn">
                              <input
                                className="btn btn-sqr"
                                type="submit"
                                name="submit"
                                defaultValue="Post Comment"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* start blog comment box */}
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
export default blog_detail;