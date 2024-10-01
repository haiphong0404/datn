import React from "react";

const Main = () => {
  return (
    <div>
    
      <main>
        {/* slider area start */}
        <section className="hero-slider">
          <div className="hero-slider-active slick-arrow-style slick-arrow-style_hero slick-dot-style">
            {/* single slider item start */}
            <div className="hero-single-slide hero-overlay">
              <div
                className="hero-slider-item hero-1 bg-img"
                style={{
                  backgroundImage: "url(/assets/img/slider/home1-slide2.jpg)",
                }} // Sử dụng style để set ảnh nền
              >
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="hero-slider-content slide-1">
                        <h1 className="slide-title">mới nhất</h1>
                        <h2 className="slide-subtitle">
                        Giày thể thao chạy bộ <span>Đàn ông thích</span>
                        </h2>
                        <a href="#" className="btn btn-large btn-bg">
                          Mua Ngay
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* single slider item start */}
            {/* single slider item start */}
            <div className="hero-single-slide hero-overlay">
              <div
                className="hero-slider-item hero-1 bg-img"
                style={{
                  backgroundImage: "url(/assets/img/slider/home2-slide1.jpg)",
                }} // Sử dụng style để set ảnh nền
              >
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="hero-slider-content slide-2">
                        <h1 className="slide-title">Giảm giá</h1>
                        <h2 className="slide-subtitle">
                        Giày thể thao chạy bộ  <span>Đàn ông thích</span>
                        </h2>
                        <a href="#" className="btn btn-large btn-bg">
                          Mua Ngay
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* single slider item start */}
          </div>
        </section>
        {/* slider area end */}
        {/* service policy start */}
        <section className="service-policy bg-gray mtn-100">
          <div className="container">
            <div className="row row-10">
              <div className="col-lg-3 col-sm-6">
                <div className="policy-block text-center">
                  <div className="policy-icon">
                    <i className="fa fa-heart-o" />
                  </div>
                  <div className="policy-text">
                    <h4 className="policy-title">
                    Giá trị lớn</h4>
                    <p className="policy-desc">
                     Bây giờ, hãy đặt bản thân trước các quy tắc về chăm sóc sức khỏe khi còn có thể
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="policy-block text-center">
                  <div className="policy-icon">
                    <i className="fa fa-truck" />
                  </div>
                  <div className="policy-text">
                    <h4 className="policy-title">
                    Giao hàng toàn cầu</h4>
                    <p className="policy-desc">
                     Bây giờ, hãy đặt bản thân trước các quy tắc về chăm sóc sức khỏe khi còn có thể
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="policy-block text-center">
                  <div className="policy-icon">
                    <i className="fa fa-credit-card" />
                  </div>
                  <div className="policy-text">
                    <h4 className="policy-title">
                    Thanh toán an toàn</h4>
                    <p className="policy-desc">
                     Bây giờ, hãy đặt bản thân trước các quy tắc về chăm sóc sức khỏe khi còn có thể
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="policy-block text-center">
                  <div className="policy-icon">
                    <i className="fa fa-headphones" />
                  </div>
                  <div className="policy-text">
                    <h4 className="policy-title">Trung tâm trợ giúp 24/7</h4>
                    <p className="policy-desc">
                     Bây giờ, hãy đặt bản thân trước các quy tắc về chăm sóc sức khỏe khi còn có thể
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* service policy end */}
        {/* about us area start */}
        <section className="about-us bg-gray section-padding">
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
                  <h2 className="about-title">Giới thiệu về giày thể thao THOR</h2>
                  <h3 className="about-subtitle">
                  Nghiên cứu đã chỉ ra rằng độc giả đọc tôi.
                  </h3>
                  <p>
                  Phần kết thúc mang tính động mạch. Vị trí của bạn khá thoải mái, nhưng không có câu trả lời rõ ràng. Giờ đây, tôi ở phía trước, muốn có sự hỗ trợ từ bạn
                  </p>
                  <ul className="about-info">
                    <li className="add">
                      <i className="fa fa-home" />
                      1 trinh van bo
                    </li>
                    <li className="phone">
                      <i className="fa fa-phone" />
                      Phone: +46 123 456 789
                    </li>
                    <li className="mail">
                      <i className="fa fa-envelope" />
                      Email: thor@gamil.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* about us area end */}
        {/* product gallery area start */}
        <section className="product-gallery section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title text-center">
                  <h3 className="title">Sản Phẩm Mới Về</h3>
                  <h4 className="sub-title">
                  Các cuộc điều tra đã chứng minh rằng người đọc dễ dàng đọc tôi hơn vì họ đọc thường xuyên hơn; sự rõ ràng cũng là một quá trình động, tiếp tục sự thay đổi.
                  </h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="product-carousel--4 slick-row-5 slick-arrow-style">
                  {/* product single item start */}
                  <div className="product-item">
                    <div className="product-thumb">
                      <a href="product-details.html">
                        <img
                          src="assets/img/product/product-1.jpg"
                          alt="product thumb"
                        />
                      </a>
                      <div className="button-group">
                        <a
                          href="wishlist.html"
                          data-bs-toggle="tooltip"
                          title="Add to Wishlist"
                        >
                          <i className="fa fa-heart-o" />
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#quick_view"
                        >
                          <span data-bs-toggle="tooltip" title="Quick View">
                            <i className="fa fa-eye" />
                          </span>
                        </a>
                      </div>
                      <div className="product-label">
                        <span>new</span>
                      </div>
                      <div className="discount-label">
                        <span>-10% Off</span>
                      </div>
                    </div>
                    <div className="product-content">
                      <div className="product-caption">
                        <h6 className="product-name">
                          <a href="product-details.html">Quickiin Mens shoes</a>
                        </h6>
                        <div className="price-box">
                          <span className="price-old">
                            <del>$90.00</del>
                          </span>
                          <span className="price-regular">$70.00</span>
                        </div>
                        <a className="add-to-cart" href="cart.html">
                          <i className="fa fa-shopping-cart" />
                        </a>
                      </div>
                      <div className="ratings">
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* product single item end */}
                  {/* product single item start */}
                  <div className="product-item">
                    <div className="product-thumb">
                      <a href="product-details.html">
                        <img
                          src="assets/img/product/product-2.jpg"
                          alt="product thumb"
                        />
                      </a>
                      <div className="button-group">
                        <a
                          href="wishlist.html"
                          data-bs-toggle="tooltip"
                          title="Add to Wishlist"
                        >
                          <i className="fa fa-heart-o" />
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#quick_view"
                        >
                          <span data-bs-toggle="tooltip" title="Quick View">
                            <i className="fa fa-eye" />
                          </span>
                        </a>
                      </div>
                      <div className="product-label">
                        <span>new</span>
                      </div>
                    </div>
                    <div className="product-content">
                      <div className="product-caption">
                        <h6 className="product-name">
                          <a href="product-details.html">
                            New Womens High Hills
                          </a>
                        </h6>
                        <div className="price-box">
                          <span className="price-old">
                            <del>$80.00</del>
                          </span>
                          <span className="price-regular">$60.00</span>
                        </div>
                        <a className="add-to-cart" href="cart.html">
                          <i className="fa fa-shopping-cart" />
                        </a>
                      </div>
                      <div className="ratings">
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* product single item end */}
                  {/* product single item start */}
                  <div className="product-item">
                    <div className="product-thumb">
                      <a href="product-details.html">
                        <img
                          src="assets/img/product/product-3.jpg"
                          alt="product thumb"
                        />
                      </a>
                      <div className="button-group">
                        <a
                          href="wishlist.html"
                          data-bs-toggle="tooltip"
                          title="Add to Wishlist"
                        >
                          <i className="fa fa-heart-o" />
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#quick_view"
                        >
                          <span data-bs-toggle="tooltip" title="Quick View">
                            <i className="fa fa-eye" />
                          </span>
                        </a>
                      </div>
                      <div className="product-label">
                        <span>new</span>
                      </div>
                    </div>
                    <div className="product-content">
                      <div className="product-caption">
                        <h6 className="product-name">
                          <a href="product-details.html">
                            Leather Mens slippers
                          </a>
                        </h6>
                        <div className="price-box">
                          <span className="price-old">
                            <del>$60.00</del>
                          </span>
                          <span className="price-regular">$50.00</span>
                        </div>
                        <a className="add-to-cart" href="cart.html">
                          <i className="fa fa-shopping-cart" />
                        </a>
                      </div>
                      <div className="ratings">
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* product single item end */}
                  {/* product single item start */}
                  <div className="product-item">
                    <div className="product-thumb">
                      <a href="product-details.html">
                        <img
                          src="assets/img/product/product-4.jpg"
                          alt="product thumb"
                        />
                      </a>
                      <div className="button-group">
                        <a
                          href="wishlist.html"
                          data-bs-toggle="tooltip"
                          title="Add to Wishlist"
                        >
                          <i className="fa fa-heart-o" />
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#quick_view"
                        >
                          <span data-bs-toggle="tooltip" title="Quick View">
                            <i className="fa fa-eye" />
                          </span>
                        </a>
                      </div>
                      <div className="product-label">
                        <span>new</span>
                      </div>
                      <div className="discount-label">
                        <span>-15% Off</span>
                      </div>
                    </div>
                    <div className="product-content">
                      <div className="product-caption">
                        <h6 className="product-name">
                          <a href="product-details.html">Rexpo Womens shoes</a>
                        </h6>
                        <div className="price-box">
                          <span className="price-old">
                            <del>$100.00</del>
                          </span>
                          <span className="price-regular">$85.00</span>
                        </div>
                        <a className="add-to-cart" href="cart.html">
                          <i className="fa fa-shopping-cart" />
                        </a>
                      </div>
                      <div className="ratings">
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* product single item end */}
                  {/* product single item start */}
                  <div className="product-item">
                    <div className="product-thumb">
                      <a href="product-details.html">
                        <img
                          src="assets/img/product/product-5.jpg"
                          alt="product thumb"
                        />
                      </a>
                      <div className="button-group">
                        <a
                          href="wishlist.html"
                          data-bs-toggle="tooltip"
                          title="Add to Wishlist"
                        >
                          <i className="fa fa-heart-o" />
                        </a>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#quick_view"
                        >
                          <span data-bs-toggle="tooltip" title="Quick View">
                            <i className="fa fa-eye" />
                          </span>
                        </a>
                      </div>
                      <div className="product-label">
                        <span>new</span>
                      </div>
                    </div>
                    <div className="product-content">
                      <div className="product-caption">
                        <h6 className="product-name">
                          <a href="product-details.html">
                            Primitive Mens shoes
                          </a>
                        </h6>
                        <div className="price-box">
                          <span className="price-old">
                            <del>$75.00</del>
                          </span>
                          <span className="price-regular">$55.00</span>
                        </div>
                        <a className="add-to-cart" href="cart.html">
                          <i className="fa fa-shopping-cart" />
                        </a>
                      </div>
                      <div className="ratings">
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                        <span>
                          <i className="fa fa-star" />
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* product single item end */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* product gallery area end */}
        {/* banner statistics area start */}
        <div className="banner-statistics-area">
          <div className="container">
            <div className="row mtn-30">
              <div className="col-md-6">
                <div className="banner-statistics mt-30">
                  <a href="#">
                    <img
                      src="assets/img/banner/banner_1.2.jpg"
                      alt="banner thumb"
                    />
                  </a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="banner-statistics mt-30">
                  <a href="#">
                    <img
                      src="assets/img/banner/banner_1.3.jpg"
                      alt="banner thumb"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* banner statistics area end */}
        {/* product tab area start */}
        <section className="product-tab-area section-padding">
          <div className="container">
            <div className="pos-special-products">
              <div className="row">
                <div className="col-lg-6 col-right">
                  <div className="deals-tab-wrapper">
                    <div className="deals-tab-area">
                      <div className="deals-nav-carousel">
                        <div className="deals-nav-item">
                          <img
                            src="assets/img/product/product-1.jpg"
                            alt="deals thumb"
                          />
                        </div>
                        <div className="deals-nav-item">
                          <img
                            src="assets/img/product/product-2.jpg"
                            alt="deals thumb"
                          />
                        </div>
                        <div className="deals-nav-item">
                          <img
                            src="assets/img/product/product-3.jpg"
                            alt="deals thumb"
                          />
                        </div>
                        <div className="deals-nav-item">
                          <img
                            src="assets/img/product/product-4.jpg"
                            alt="deals thumb"
                          />
                        </div>
                        <div className="deals-nav-item">
                          <img
                            src="assets/img/product/product-5.jpg"
                            alt="deals thumb"
                          />
                        </div>
                        <div className="deals-nav-item">
                          <img
                            src="assets/img/product/product-6.jpg"
                            alt="deals thumb"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="deals-content-wrapper">
                      <div className="deals-content-carousel">
                        {/* single slide item start */}
                        <div className="deals-slide-item">
                          <div className="deals-content-item">
                            <h2 className="deals-title">
                              <a href="product-details.html">
                                Giày nam hàng đầu
                              </a>
                            </h2>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                            <p className="deals-desc">
                            Máy quay 4K UHD đầu tiên của Canon, GX10 có
                            thiết kế nhỏ gọn và di động mang lại ...
                            </p>
                            <div className="price-box">
                              <span className="price-old">
                                <del>$80.00</del>
                              </span>
                              <span className="price-regular">$26.10</span>
                            </div>
                            <a className="shop-btn" href="shop.html">
                              Thêm vào Giỏ hàng
                            </a>
                            <div
                              className="product-countdown"
                              data-countdown="2021/10/20"
                            />
                          </div>
                        </div>
                        {/* single slide item end */}
                        {/* single slide item start */}
                        <div className="deals-slide-item">
                          <div className="deals-content-item">
                            <h2 className="deals-title">
                              <a href="product-details.html">
                                Giày nam hàng đầu
                              </a>
                            </h2>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                            <p className="deals-desc">
                              Máy quay 4K UHD đầu tiên của Canon, GX10 có
                            thiết kế nhỏ gọn và di động mang lại ...
                            </p>
                            <div className="price-box">
                              <span className="price-old">
                                <del>$80.00</del>
                              </span>
                              <span className="price-regular">$26.10</span>
                            </div>
                            <a className="shop-btn" href="shop.html">
                                                            Thêm vào Giỏ hàng

                            </a>
                            <div
                              className="product-countdown"
                              data-countdown="2021/09/20"
                            />
                          </div>
                        </div>
                        {/* single slide item end */}
                        {/* single slide item start */}
                        <div className="deals-slide-item">
                          <div className="deals-content-item">
                            <h2 className="deals-title">
                              <a href="product-details.html">
                                Giày nam hàng đầu
                              </a>
                            </h2>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                            <p className="deals-desc">
                              Máy quay 4K UHD đầu tiên của Canon, GX10 có
                            thiết kế nhỏ gọn và di động mang lại ...
                            </p>
                            <div className="price-box">
                              <span className="price-old">
                                <del>$80.00</del>
                              </span>
                              <span className="price-regular">$26.10</span>
                            </div>
                            <a className="shop-btn" href="shop.html">
                                                            Thêm vào Giỏ hàng

                            </a>
                            <div
                              className="product-countdown"
                              data-countdown="2021/09/20"
                            />
                          </div>
                        </div>
                        {/* single slide item end */}
                        {/* single slide item start */}
                        <div className="deals-slide-item">
                          <div className="deals-content-item">
                            <h2 className="deals-title">
                              <a href="product-details.html">
                                Giày nam hàng đầu
                              </a>
                            </h2>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                            <p className="deals-desc">
                              Máy quay 4K UHD đầu tiên của Canon, GX10 có
                            thiết kế nhỏ gọn và di động mang lại ...
                            </p>
                            <div className="price-box">
                              <span className="price-old">
                                <del>$80.00</del>
                              </span>
                              <span className="price-regular">$26.10</span>
                            </div>
                            <a className="shop-btn" href="shop.html">
                                                            Thêm vào Giỏ hàng

                            </a>
                            <div
                              className="product-countdown"
                              data-countdown="2021/09/20"
                            />
                          </div>
                        </div>
                        {/* single slide item end */}
                        {/* single slide item start */}
                        <div className="deals-slide-item">
                          <div className="deals-content-item">
                            <h2 className="deals-title">
                              <a href="product-details.html">
                                Giày nam hàng đầu
                              </a>
                            </h2>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                            <p className="deals-desc">
                              Máy quay 4K UHD đầu tiên của Canon, GX10 có
                            thiết kế nhỏ gọn và di động mang lại ...
                            </p>
                            <div className="price-box">
                              <span className="price-old">
                                <del>$80.00</del>
                              </span>
                              <span className="price-regular">$26.10</span>
                            </div>
                            <a className="shop-btn" href="shop.html">
                                                            Thêm vào Giỏ hàng

                            </a>
                            <div
                              className="product-countdown"
                              data-countdown="2021/09/20"
                            />
                          </div>
                        </div>
                        {/* single slide item end */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* product tab area end */}
        {/* category area start */}
        <section
          className="category-area bg-set bg-img section-padding pb-0"
          style={{
            backgroundImage: "url(/assets/img/bg/bg-listcate.jpg)",
          }} 
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title text-center">
                  <h3 className="title text-white">
                  MUA SẮM THEO DANH MỤC THOR
                  </h3>
                  <h4 className="sub-title text-white">
                  Các cuộc điều tra đã chứng minh rằng người đọc dễ dàng đọc tôi hơn vì họ đọc thường xuyên hơn; sự rõ ràng cũng là một quá trình động, theo sau sự thay đổi.
                  </h4>
                </div>
              </div>
            </div>
            <div className="row category-wrapper">
              <div className="col-12">
                <div className="catagory-carousel-active slick-row-15">
                  <div className="single-category-item">
                    <div className="category-title">
                      <a href="shop.html">NAM</a>
                    </div>
                    <div className="category-thumb">
                      <a href="shop.html">
                        <img
                          src="assets/img/category/category-1.png"
                          alt="category thumb"
                        />
                      </a>
                    </div>
                    <div className="shop-collection text-center">
                      <a className="shop-btn" href="shop.html">
                        Bộ sưu tập cửa hàng
                      </a>
                    </div>
                  </div>
                  <div className="single-category-item">
                    <div className="category-title">
                      <a href="shop.html">NỮ</a>
                    </div>
                    <div className="category-thumb">
                      <a href="shop.html">
                        <img
                          src="assets/img/category/category-2.png"
                          alt="category thumb"
                        />
                      </a>
                    </div>
                    <div className="shop-collection text-center">
                      <a className="shop-btn" href="shop.html">
                        Bộ sưu tập cửa hàng
                      </a>
                    </div>
                  </div>
                  <div className="single-category-item">
                    <div className="category-title">
                      <a href="shop.html">NHANH CHÓNG
                      </a>
                    </div>
                    <div className="category-thumb">
                      <a href="shop.html">
                        <img
                          src="assets/img/category/category-3.png"
                          alt="category thumb"
                        />
                      </a>
                    </div>
                    <div className="shop-collection text-center">
                      <a className="shop-btn" href="shop.html">
                        Bộ sưu tập cửa hàng
                      </a>
                    </div>
                  </div>
                  <div className="single-category-item">
                    <div className="category-title">
                      <a href="shop.html">Kids</a>
                    </div>
                    <div className="category-thumb">
                      <a href="shop.html">
                        <img
                          src="assets/img/category/category-2.png"
                          alt="category thumb"
                        />
                      </a>
                    </div>
                    <div className="shop-collection text-center">
                      <a className="shop-btn" href="shop.html">
                        Bộ sưu tập cửa hàng
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* category area end */}
        {/* product gallery area start */}
        <section className="product-gallery section-padding mt-100">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title text-center">
                  <h3 className="title">CỬA HÀNG CỦA CHÚNG TÔI</h3>
                  <h4 className="sub-title">
                  Các cuộc điều tra đã chứng minh rằng người đọc dễ dàng đọc tôi hơn vì họ đọc thường xuyên hơn; sự rõ ràng cũng là một quá trình động, theo sau sự thay đổi.
                  </h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="product-container">
                  {/* product tab menu start */}
                  <div className="product-tab-menu">
                    <ul className="nav justify-content-center">
                      <li>
                        <a href="#tab1" className="active" data-bs-toggle="tab">
                        Hàng Mới Về
                        </a>
                      </li>
                      <li>
                        <a href="#tab2" data-bs-toggle="tab">
                        Sản Phẩm Bán Chạy Nhất.
                        </a>
                      </li>
                      <li>
                        <a href="#tab3" data-bs-toggle="tab">
                        Sản Phẩm Nổi Bật
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* product tab menu end */}
                  {/* product tab content start */}
                  <div className="tab-content">
                    {/* single tab item start */}
                    <div className="tab-pane fade show active" id="tab1">
                      <div className="product-carousel-4_2 slick-row-5 slick-arrow-style">
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-1.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                            <div className="discount-label">
                              <span>-10% Off</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Quickiin Mens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$90.00</del>
                                </span>
                                <span className="price-regular">$70.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-2.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  New Womens High Hills
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$80.00</del>
                                </span>
                                <span className="price-regular">$60.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-3.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Leather Mens slippers
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$60.00</del>
                                </span>
                                <span className="price-regular">$50.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-4.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                            <div className="discount-label">
                              <span>-15% Off</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Rexpo Womens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$100.00</del>
                                </span>
                                <span className="price-regular">$85.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-5.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Primitive Mens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$75.00</del>
                                </span>
                                <span className="price-regular">$55.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-6.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Quickiin Mens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$90.00</del>
                                </span>
                                <span className="price-regular">$70.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-7.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  New Womens High Hills
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$80.00</del>
                                </span>
                                <span className="price-regular">$60.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-8.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                            <div className="discount-label">
                              <span>-10% Off</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Leather Mens slippers
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$60.00</del>
                                </span>
                                <span className="price-regular">$50.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-9.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                            <div className="discount-label">
                              <span>-10% Off</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Quickiin Mens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$90.00</del>
                                </span>
                                <span className="price-regular">$70.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-10.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  New Womens High Hills
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$80.00</del>
                                </span>
                                <span className="price-regular">$60.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                      </div>
                    </div>
                    {/* single tab item end */}
                    {/* single tab item start */}
                    <div className="tab-pane fade" id="tab2">
                      <div className="product-carousel-4_2 slick-row-5 slick-arrow-style">
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-10.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Quickiin Mens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$90.00</del>
                                </span>
                                <span className="price-regular">$70.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-9.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  New Womens High Hills
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$80.00</del>
                                </span>
                                <span className="price-regular">$60.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-8.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Leather Mens slippers
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$60.00</del>
                                </span>
                                <span className="price-regular">$50.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-7.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                            <div className="discount-label">
                              <span>-15% Off</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Rexpo Womens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$100.00</del>
                                </span>
                                <span className="price-regular">$85.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-6.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                            <div className="discount-label">
                              <span>-10% Off</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Primitive Mens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$75.00</del>
                                </span>
                                <span className="price-regular">$55.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-5.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Quickiin Mens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$90.00</del>
                                </span>
                                <span className="price-regular">$70.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-4.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  New Womens High Hills
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$80.00</del>
                                </span>
                                <span className="price-regular">$60.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-3.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                            <div className="discount-label">
                              <span>-10% Off</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Leather Mens slippers
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$60.00</del>
                                </span>
                                <span className="price-regular">$50.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-2.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                            <div className="discount-label">
                              <span>-10% Off</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Rexpo Womens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$100.00</del>
                                </span>
                                <span className="price-regular">$85.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-1.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Primitive Mens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$75.00</del>
                                </span>
                                <span className="price-regular">$55.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                      </div>
                    </div>
                    {/* single tab item end */}
                    {/* single tab item start */}
                    <div className="tab-pane fade" id="tab3">
                      <div className="product-carousel-4_2 slick-row-5 slick-arrow-style">
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-2.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                            <div className="discount-label">
                              <span>-10% Off</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Quickiin Mens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$90.00</del>
                                </span>
                                <span className="price-regular">$70.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-4.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  New Womens High Hills
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$80.00</del>
                                </span>
                                <span className="price-regular">$60.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-6.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Leather Mens slippers
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$60.00</del>
                                </span>
                                <span className="price-regular">$50.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-8.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                            <div className="discount-label">
                              <span>-15% Off</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Rexpo Womens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$100.00</del>
                                </span>
                                <span className="price-regular">$85.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-10.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                            <div className="discount-label">
                              <span>-20% Off</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Primitive Mens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$75.00</del>
                                </span>
                                <span className="price-regular">$55.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-1.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Quickiin Mens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$90.00</del>
                                </span>
                                <span className="price-regular">$70.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-3.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  New Womens High Hills
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$80.00</del>
                                </span>
                                <span className="price-regular">$60.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-5.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                            <div className="discount-label">
                              <span>-10% Off</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Leather Mens slippers
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$60.00</del>
                                </span>
                                <span className="price-regular">$50.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-7.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Rexpo Womens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$100.00</del>
                                </span>
                                <span className="price-regular">$85.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                        {/* product single item start */}
                        <div className="product-item">
                          <div className="product-thumb">
                            <a href="product-details.html">
                              <img
                                src="assets/img/product/product-9.jpg"
                                alt="product thumb"
                              />
                            </a>
                            <div className="button-group">
                              <a
                                href="wishlist.html"
                                data-bs-toggle="tooltip"
                                title="Add to Wishlist"
                              >
                                <i className="fa fa-heart-o" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#quick_view"
                              >
                                <span
                                  data-bs-toggle="tooltip"
                                  title="Quick View"
                                >
                                  <i className="fa fa-eye" />
                                </span>
                              </a>
                            </div>
                            <div className="product-label">
                              <span>new</span>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-caption">
                              <h6 className="product-name">
                                <a href="product-details.html">
                                  Primitive Mens shoes
                                </a>
                              </h6>
                              <div className="price-box">
                                <span className="price-old">
                                  <del>$75.00</del>
                                </span>
                                <span className="price-regular">$55.00</span>
                              </div>
                              <a className="add-to-cart" href="cart.html">
                                <i className="fa fa-shopping-cart" />
                              </a>
                            </div>
                            <div className="ratings">
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* product single item end */}
                      </div>
                    </div>
                    {/* single tab item end */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* product gallery area end */}
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
                        <p className="testimonial-desc">
                        "Khi khách hàng tiềm năng đang nghiên cứu về bạn trực tuyến, họ đang tìm hiểu về bạn qua nội dung của trang web của bạn."
                        </p>
                        <div className="testimonial-author">
                          <img
                            src="assets/img/testimonial/testimonial-1.png"
                            alt="testimonial author"
                          />
                        </div>
                        <h6 className="author-designation">MINH HIẾU</h6>
                      </div>
                    </div>
                    {/* slide item end */}
                    {/* slide item start */}
                    <div className="testimonial-slide-item">
                      <div className="testimonial-item text-center">
                        <p className="testimonial-desc">
                        "Khi khách hàng tiềm năng đang nghiên cứu về bạn trực tuyến, họ đang tìm hiểu về bạn qua nội dung của trang web của bạn."
                        </p>
                        <div className="testimonial-author">
                          <img
                            src="assets/img/testimonial/testimonial-1.png"
                            alt="testimonial author"
                          />
                        </div>
                        <h6 className="author-designation">Trung Dũng</h6>
                      </div>
                    </div>
                    {/* slide item end */}
                    {/* slide item start */}
                    <div className="testimonial-slide-item">
                      <div className="testimonial-item text-center">
                        <p className="testimonial-desc">
                        "Khi khách hàng tiềm năng đang nghiên cứu về bạn trực tuyến, họ đang tìm hiểu về bạn qua nội dung của trang web của bạn."
                        </p>
                        <div className="testimonial-author">
                          <img
                            src="assets/img/testimonial/testimonial-1.png"
                            alt="testimonial author"
                          />
                        </div>
                        <h6 className="author-designation">ĐỨC</h6>
                      </div>
                    </div>
                    {/* slide item end */}
                  </div>
                </div>
                <div className="brand-logo-wrapper">
                  <div className="brand-logo-carousel slick-row-10 slick-arrow-style">
                    {/* single brand start */}
                    <div className="brand-item">
                      <a href="#">
                        <img src="assets/img/brand/1.png" alt="" />
                      </a>
                    </div>
                    {/* single brand end */}
                    {/* single brand start */}
                    <div className="brand-item">
                      <a href="#">
                        <img src="assets/img/brand/2.png" alt="" />
                      </a>
                    </div>
                    {/* single brand end */}
                    {/* single brand start */}
                    <div className="brand-item">
                      <a href="#">
                        <img src="assets/img/brand/3.png" alt="" />
                      </a>
                    </div>
                    {/* single brand end */}
                    {/* single brand start */}
                    <div className="brand-item">
                      <a href="#">
                        <img src="assets/img/brand/4.png" alt="" />
                      </a>
                    </div>
                    {/* single brand end */}
                    {/* single brand start */}
                    <div className="brand-item">
                      <a href="#">
                        <img src="assets/img/brand/5.png" alt="" />
                      </a>
                    </div>
                    {/* single brand end */}
                    {/* single brand start */}
                    <div className="brand-item">
                      <a href="#">
                        <img src="assets/img/brand/6.png" alt="" />
                      </a>
                    </div>
                    {/* single brand end */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* testimonial area end */}
        {/* latest blog area start */}
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
              <div className="col-12">
                <div className="blog-carousel-active slick-row-5 slick-arrow-style">
                  {/* blog single post start */}
                  <div className="blog-slide-item">
                    <div className="blog-post-item">
                      <div className="blog-thumb">
                        <a href="blog-details.html">
                          <img
                            src="assets/img/blog/blog-1.jpg"
                            alt="blog thumb"
                          />
                        </a>
                      </div>
                      <div className="blog-content">
                        <h6 className="blog-title">
                          <a href="blog-details.html">
                          Đây là bài viết đầu tiên XipBlog
                          </a>
                        </h6>
                        <div className="blog-meta">
                          <span>
                            <i className="fa fa-calendar" />
                            Ngày 05 tháng 8 năm 2021
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
                  </div>
                  {/* blog single post end */}
                  {/* blog single post start */}
                  <div className="blog-slide-item">
                    <div className="blog-post-item">
                      <div className="blog-thumb">
                        <a href="blog-details.html">
                          <img
                            src="assets/img/blog/blog-2.jpg"
                            alt="blog thumb"
                          />
                        </a>
                      </div>
                      <div className="blog-content">
                        <h6 className="blog-title">
                          <a href="blog-details.html">
                          Đây là bài viết đầu tiên XipBlog
                          </a>
                        </h6>
                        <div className="blog-meta">
                          <span>
                            <i className="fa fa-calendar" />
                            Jun 05, 2021
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
                  </div>
                  {/* blog single post end */}
                  {/* blog single post start */}
                  <div className="blog-slide-item">
                    <div className="blog-post-item">
                      <div className="blog-thumb">
                        <a href="blog-details.html">
                          <img
                            src="assets/img/blog/blog-3.jpg"
                            alt="blog thumb"
                          />
                        </a>
                      </div>
                      <div className="blog-content">
                        <h6 className="blog-title">
                          <a href="blog-details.html">
                            This is Third Post XipBlog
                          </a>
                        </h6>
                        <div className="blog-meta">
                          <span>
                            <i className="fa fa-calendar" />
                            May 05, 2021
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
                  </div>
                  {/* blog single post end */}
                  {/* blog single post start */}
                  <div className="blog-slide-item">
                    <div className="blog-post-item">
                      <div className="blog-thumb">
                        <a href="blog-details.html">
                          <img
                            src="assets/img/blog/blog-4.jpg"
                            alt="blog thumb"
                          />
                        </a>
                      </div>
                      <div className="blog-content">
                        <h6 className="blog-title">
                          <a href="blog-details.html">
                            This is Fourth Post XipBlog
                          </a>
                        </h6>
                        <div className="blog-meta">
                          <span>
                            <i className="fa fa-calendar" />
                            Jan 08, 2021
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
                  </div>
                  {/* blog single post end */}
                  {/* blog single post start */}
                  <div className="blog-slide-item">
                    <div className="blog-post-item">
                      <div className="blog-thumb">
                        <a href="blog-details.html">
                          <img
                            src="assets/img/blog/blog-2.jpg"
                            alt="blog thumb"
                          />
                        </a>
                      </div>
                      <div className="blog-content">
                        <h6 className="blog-title">
                          <a href="blog-details.html">
                            This is Fifth Post XipBlog
                          </a>
                        </h6>
                        <div className="blog-meta">
                          <span>
                            <i className="fa fa-calendar" />
                            Ngày 05 tháng 8 năm 2021
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
                  </div>
                  {/* blog single post end */}
                  {/* blog single post start */}
                  <div className="blog-slide-item">
                    <div className="blog-post-item">
                      <div className="blog-thumb">
                        <a href="blog-details.html">
                          <img
                            src="assets/img/blog/blog-3.jpg"
                            alt="blog thumb"
                          />
                        </a>
                      </div>
                      <div className="blog-content">
                        <h6 className="blog-title">
                          <a href="blog-details.html">
                            This is Seventh Post XipBlog
                          </a>
                        </h6>
                        <div className="blog-meta">
                          <span>
                            <i className="fa fa-calendar" />
                            Ngày 05 tháng 8 năm 2021
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
                  </div>
                  {/* blog single post end */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* latest blog area end */}
      </main>
    </div>
  );
};

export default Main;
