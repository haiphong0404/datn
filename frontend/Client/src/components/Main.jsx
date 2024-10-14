import React, { useEffect, useState } from "react";
import axios from "axios"
const Main = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  // Fetch dữ liệu từ API khi component được mount
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products') // Đường dẫn tới API Laravel
      .then(response => {
        setProducts(response.data); // Đặt dữ liệu vào state
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/Apibrands') // Đường dẫn tới API Laravel
      .then(response => {
        setBrands(response.data); // Đặt dữ liệu vào state
      })
      .catch(error => {
        console.error('Error fetching brands:', error);
      });
  }, []);
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
                        <a href="/shop" className="btn btn-large btn-bg">
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
                        <a href="shop" className="btn btn-large btn-bg">
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

            {/* product single item start */}
            <div className="product-list">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-thumb">
                    <a href="product-details.html">
                      <img
                        src={product.image || '/path/to/placeholder.jpg'} // Đổ hình ảnh từ API
                        alt={product.name}
                      />
                    </a>
                    <div className="button-group">
                      <a href="wishlist.html" data-bs-toggle="tooltip" title="Add to Wishlist">
                        <i className="fa fa-heart-o" />
                      </a>
                      <a href="#" data-bs-toggle="modal" data-bs-target="#quick_view">
                        <span data-bs-toggle="tooltip" title="Quick View">
                          <i className="fa fa-eye" />
                        </span>
                      </a>
                    </div>
                    
                  </div>
                  <div className="product-content">
                    <div className="product-caption">
                      <h6 className="product-name">
                        <a href="product-details.html">{product.name}</a> {/* Đổ tên sản phẩm */}
                      </h6>
                      <div className="price-box">
                        <span className="price-regular">${product.price}</span> {/* Đổ giá hiện tại */}
                      </div>
                      <a className="add-to-cart" href="cart.html">
                        <i className="fa fa-shopping-cart" />
                      </a>
                    </div>

                  </div>
                </div>
              ))}
            </div>
            {/* product single item end */}

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

                        {products.slice(0, 4).map((product) => (
                          <div key={product.id} className="product-item">
                            <div className="product-thumb">
                              <a href="product-details.html">
                                <img
                                  src={product.image || '/path/to/placeholder.jpg'} // Đổ hình ảnh từ API
                                  alt={product.name}
                                />
                              </a>


                            </div>

                          </div>
                        ))}


                      </div>
                    </div>
                    <div className="deals-content-wrapper">
                      <div className="deals-content-carousel">
                        {Array.isArray(products) && products.slice(0, 1).map((product) => (
                          <div key={product.id} className="deals-slide-item">
                            <div className="deals-content-item">
                              <h2 className="deals-title">
                                <a href="product-details.html">{product.name}</a>
                              </h2>
                              <p className="deals-desc">{product.description}</p>
                              <a className="shop-btn" href="shop.html">Thêm vào Giỏ hàng</a>
                            </div>
                          </div>
                        ))}

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
                </div>
              </div>
            </div>
            <div className="product-list">
              {products.slice(0, 8).map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-thumb">
                    <a href="product-details.html">
                      <img
                        src={product.image || '/path/to/placeholder.jpg'} // Đổ hình ảnh từ API
                        alt={product.name}
                      />
                    </a>
                    <div className="button-group">
                      <a href="wishlist.html" data-bs-toggle="tooltip" title="Add to Wishlist">
                        <i className="fa fa-heart-o" />
                      </a>
                      <a href="#" data-bs-toggle="modal" data-bs-target="#quick_view">
                        <span data-bs-toggle="tooltip" title="Quick View">
                          <i className="fa fa-eye" />

                        </span>
                      </a>
                    </div>
                    
                  </div>
                  <div className="product-content">
                    <div className="product-caption">
                      <h6 className="product-name">
                        <a href="product-details.html">{product.name}</a> {/* Đổ tên sản phẩm */}
                      </h6>
                      <div className="price-box">
                        <span className="price-regular">${product.price}</span> {/* Đổ giá hiện tại */}
                      </div>
                      <a className="add-to-cart" href="cart.html">
                        <i className="fa fa-shopping-cart" />
                      </a>
                    </div>

                  </div>
                </div>
              ))}
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
                  </div>
                </div>
                <div className="brand-section">
                  {Array.isArray(brands) && brands.length > 0 ? (
                        brands.map((brand) => (
                          <div key={brand.id} className="brand-item">
                            <a href={brand.link}>
                            <img
                                    src={brand.image || '/path/to/placeholder.jpg'} // Đổ hình ảnh base64 từ API
                                    alt={brand.name}
                                    style={{ width: '100px', height: '100px' }} // Kích thước hình ảnh
                                />
                            </a>
                          </div>
                        ))
                      ) : (
                        <p>No brands available</p> // Hiển thị nếu không có thương hiệu nào
                      )}
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
