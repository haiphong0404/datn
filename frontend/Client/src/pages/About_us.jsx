

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
                    src="assets/img/about/about.jpg"
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
        <section
          className="testimonial-area bg-img section-padding"
          style={{
            backgroundImage: "url(/assets/img/bg/bg-testimonial.jpg)",
          }}

        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="testimonial-wrapper">
                  <div className="testimonial-carousel">
                    {/* slide item start */}
                    <div className="testimonial-slide-item">
                      <div className="testimonial-item text-center">
                        <h6 className="author-designation">Sản Phẩm của Chúng Tôi</h6>
                        <br />
                        <p className="testimonial-desc">
                          "Chúng tôi tự hào mang đến đa dạng mẫu mã giày Thor, từ giày thể thao đến giày thời trang, với nhiều màu sắc và kích cỡ khác nhau. Tất cả sản phẩm đều được làm từ chất liệu cao cấp, đảm bảo sự thoải mái và an toàn cho đôi chân của bạn."
                        </p>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* testimonial area end */}
        {/* team area start */}
        <div className="team-area section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title text-center">
                  <h3 className="title">
                  ĐỘI NGŨ CỦA CHÚNG TÔI</h3>
                  <h4 className="sub-title">
                  Tại Giày Thor, chúng tôi tự hào có một đội ngũ chuyên nghiệp và nhiệt huyết, những người không chỉ có kiến thức sâu rộng về sản phẩm mà còn đam mê với ngành thời trang giày dép. Đội ngũ của chúng tôi bao gồm:
                  </h4>
                </div>
              </div>
            </div>
            <div className="row mbn-30">
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="team-member mb-30">
                  <div className="team-thumb">
                    <img src="assets/img/team/01.jpg" alt="" />
                    <div className="team-social">
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-linkedin" />
                      </a>
                      <a href="#">
                        <i className="fa fa-google-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="team-content text-center">
                    <h6 className="team-member-name">Ngô Hải Phong</h6>
                    <p>Ceo</p>
                  </div>
                </div>
              </div>{" "}
              {/* end single team member */}
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="team-member mb-30">
                  <div className="team-thumb">
                    <img src="assets/img/team/02.jpg" alt="" />
                    <div className="team-social">
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-linkedin" />
                      </a>
                      <a href="#">
                        <i className="fa fa-google-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="team-content text-center">
                    <h6 className="team-member-name">Đỗ Quang Quyết</h6>
                    <p>Designer</p>
                  </div>
                </div>
              </div>{" "}
              {/* end single team member */}
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="team-member mb-30">
                  <div className="team-thumb">
                    <img src="assets/img/team/03.jpg" alt="" />
                    <div className="team-social">
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-linkedin" />
                      </a>
                      <a href="#">
                        <i className="fa fa-google-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="team-content text-center">
                    <h6 className="team-member-name">Nguyễn Quang Huy</h6>
                    <p>Developer</p>
                  </div>
                </div>
              </div>{" "}
              {/* end single team member */}
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="team-member mb-30">
                  <div className="team-thumb img-full">
                    <img src="assets/img/team/04.jpg" alt="" />
                    <div className="team-social">
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-linkedin" />
                      </a>
                      <a href="#">
                        <i className="fa fa-google-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="team-content text-center">
                    <h6 className="team-member-name">Vũ Trung Kiên</h6>
                    <p>Marketing Officer</p>
                  </div>
                </div>
              </div>{" "}
              {/* end single team member */}
            </div>
          </div>
        </div>
        {/* team area end */}
      </main>


    </div>
  );
};

export default AboutUs;