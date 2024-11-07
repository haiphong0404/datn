import React from 'react';

const Blog = () => {
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
          {/* Blog Item 1 */}
          <div className="col-md-6 mb-4">
            <div className="blog-post-item">
              <div className="blog-thumb">
                <a href="blog-details.html">
                  <img src="assets/img/blog/blog-1.jpg" alt="blog thumb" />
                </a>
              </div>
              <div className="blog-content">
                <h6 className="blog-title">
                  <a href="blog-details.html">Đây là bài viết đầu tiên XipBlog</a>
                </h6>
                <div className="blog-meta">
                  <span><i className="fa fa-calendar" /> Ngày 05 tháng 8 năm 2021</span>
                  <span><i className="fa fa-user" /> Admin</span>
                </div>
                <p className="blog-desc">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. ...
                </p>
                <a className="btn read-more" href="blog-details.html">Read More</a>
              </div>
            </div>
          </div>
          
          {/* Blog Item 2 */}
          <div className="col-md-6 mb-4">
            <div className="blog-post-item">
              <div className="blog-thumb">
                <a href="blog-details.html">
                  <img src="assets/img/blog/blog-2.jpg" alt="blog thumb" />
                </a>
              </div>
              <div className="blog-content">
                <h6 className="blog-title">
                  <a href="blog-details.html">Đây là bài viết thứ hai XipBlog</a>
                </h6>
                <div className="blog-meta">
                  <span><i className="fa fa-calendar" /> Jun 05, 2021</span>
                  <span><i className="fa fa-user" /> Admin</span>
                </div>
                <p className="blog-desc">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. ...
                </p>
                <a className="btn read-more" href="blog-details.html">Read More</a>
              </div>
            </div>
          </div>

          {/* Blog Item 3 */}
          <div className="col-md-6 mb-4">
            <div className="blog-post-item">
              <div className="blog-thumb">
                <a href="blog-details.html">
                  <img src="assets/img/blog/blog-3.jpg" alt="blog thumb" />
                </a>
              </div>
              <div className="blog-content">
                <h6 className="blog-title">
                  <a href="blog-details.html">Đây là bài viết thứ ba XipBlog</a>
                </h6>
                <div className="blog-meta">
                  <span><i className="fa fa-calendar" /> May 05, 2021</span>
                  <span><i className="fa fa-user" /> Admin</span>
                </div>
                <p className="blog-desc">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. ...
                </p>
                <a className="btn read-more" href="blog-details.html">Read More</a>
              </div>
            </div>
          </div>

          {/* Blog Item 4 */}
          <div className="col-md-6 mb-4">
            <div className="blog-post-item">
              <div className="blog-thumb">
                <a href="blog-details.html">
                  <img src="assets/img/blog/blog-4.jpg" alt="blog thumb" />
                </a>
              </div>
              <div className="blog-content">
                <h6 className="blog-title">
                  <a href="blog-details.html">Đây là bài viết thứ tư XipBlog</a>
                </h6>
                <div className="blog-meta">
                  <span><i className="fa fa-calendar" /> Jan 08, 2021</span>
                  <span><i className="fa fa-user" /> Admin</span>
                </div>
                <p className="blog-desc">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. ...
                </p>
                <a className="btn read-more" href="blog-details.html">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
