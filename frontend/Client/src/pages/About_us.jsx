

import React from 'react';

const AboutUs = () => {
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
                    <h3 className="breadcrumb-title">Giới thiệu</h3>
                    <ul className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <a href="/">
                          <i className="fa fa-home" />
                        </a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        About Us
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* breadcrumb area end */}
        {/* about us area start */}
        <section className="about-us section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div
                  className="about-thumb js-tilt"
                  data-tilt-perspective={1000}
                  data-tilt-scale={1}
                  data-tilt-speed={500}
                  data-tilt-max={15}
                >
                  <img
                    className="w-100"
                    src="assets/img/about/gioithieu.webp"
                    alt="about thumb"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-content">
                  <h2 className="about-title">Giới thiệu về Thor</h2>
                  <h3 className="about-subtitle">
                    Tầm Nhìn và Sứ Mệnh
                  </h3>
                  <p>
                    Tại Giày Thor, chúng tôi không chỉ đơn thuần là một cửa hàng giày. Chúng tôi mong muốn mang đến cho khách hàng những sản phẩm không chỉ đẹp mắt mà còn thoải mái và bền bỉ. Sứ mệnh của chúng tôi là kết nối mọi người với những đôi giày độc đáo, giúp họ thể hiện cá tính và phong cách riêng của mình.
                  </p>
                  <ul className="about-info">
                    <li className="add">
                      <i className="fa fa-home" />
                      124 Đ. Di Trạch, Di Trạch, Từ Liêm, Hà Nội, Việt Nam
                    </li>
                    <li className="phone">
                      <i className="fa fa-phone" />
                      Phone: 0969798999
                    </li>
                    <li className="mail">
                      <i className="fa fa-envelope" />
                      Email: shoesthor@gmail.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* about us area end */}
        {/* choosing area start */}
        <div className="choosing-area section-padding pt-0">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title text-center">
                  <h3 className="title">Tại Sao Chọn Giày Thor?</h3>
                  <h4 className="sub-title">
                  Chất lượng đảm bảo: Chúng tôi cam kết cung cấp sản phẩm chất lượng nhất.
                  </h4>
                </div>
              </div>
            </div>
            <div className="row mbn-30">
              <div className="col-lg-4 col-md-4">
                <div className="single-choose-item text-center mb-30">
                  <i className="fa fa-globe" />
                  <h4>Miễn phí vận chuyển
                  </h4>
                  <p>
                  Tất cả đơn hàng trên 500.000 VNĐ sẽ được miễn phí giao hàng, giúp bạn tiết kiệm chi phí khi mua sắm.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="single-choose-item text-center mb-30">
                  <i className="fa fa-plane" />
                  <h4>Giao hàng nhanh</h4>
                  <p>
                  Chúng tôi đảm bảo đơn hàng của bạn sẽ được giao đúng hẹn và an toàn.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="single-choose-item text-center mb-30">
                  <i className="fa fa-comments" />
                  <h4>Hỗ trợ khách hàng</h4>
                  <p>
                  Đội ngũ nhân viên nhiệt tình và chuyên nghiệp luôn sẵn sàng hỗ trợ bạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* choosing area end */}
        {/* testimonial area start */}
        
        {/* testimonial area end */}
        {/* team area start */}
       
      </main>


    </div>
  );
};

export default AboutUs;