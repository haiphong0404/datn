import React, { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/product';
import { useDispatch, useSelector } from "react-redux";
import add, { loadCartFromLocalStorage } from "../actions/action"
import axios from "axios";
import HeroSlider from "./homes/HeroSlider";
import Category from "./homes/Category";
import Brand from "./homes/Brand";
import Blog from "./homes/Blog";
import ProductTab from "./homes/ProductTab";
import { Link } from "react-router-dom";
// import QuickViewModal from "./quickview/QuickView";



const Main = () => {
  // const [showQuickView, setShowQuickView] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);

  // const handleQuickView = (product) => {
  //   setSelectedProduct(product);
  //   setShowQuickView(true);
  // };

  // const handleCloseQuickView = () => {
  //   setShowQuickView(false);
  //   setSelectedProduct(null);
  // };
  // const cart = useSelector(state => state.updateCart)
  // const [localCart, setLocalCart] = useState(cart);
  // const dispatch = useDispatch()
  //   const handleAddToCart = (product) => {
  //     // Thêm sản phẩm vào giỏ hàng
  //     const updatedCart = [...localCart, product];
  //     setLocalCart(updatedCart); // Cập nhật local state
  //     localStorage.setItem("cart", JSON.stringify(updatedCart)); // Lưu vào localStorage

  //     // Cập nhật Redux store
  //     dispatch(add(product)); // Giả sử bạn có một action để thêm sản phẩm vào Redux store
  // };
  // useEffect(() => {
  //   const savedCart = loadCartFromLocalStorage(); // Lấy giỏ hàng từ localStorage
  //   setLocalCart(savedCart);
  // }, [cart]);

  const { data: products = [], error: productsError } = useQuery({
    queryKey: ['Products'],
    queryFn: fetchProducts,
  });
  return (
    <div>
      <main>
        {/* slider area start */}
        <HeroSlider />
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
                      Chúng tôi cung cấp những sản phẩm với giá cả hợp lý, mang đến giá trị tốt nhất cho khách hàng.
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
                      Miễn phí giao hàng</h4>
                    <p className="policy-desc">
                      Tất cả đơn hàng trên 500.000 VNĐ sẽ được miễn phí giao hàng, giúp bạn tiết kiệm chi phí khi mua sắm.
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
                      Chúng tôi đảm bảo rằng mọi giao dịch của bạn với hình thức thanh toán tiện lợi và an toàn.
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
                      Đội ngũ hỗ trợ khách hàng luôn sẵn sàng 24/7 để giải đáp mọi thắc mắc của bạn .
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
                  <h2 className="about-title">Giới thiệu về THOR</h2>
                  <h3 className="about-subtitle">
                    Nghiên cứu đã chỉ ra rằng độc giả đọc tôi.
                  </h3>
                  <p>
                    Chào mừng bạn đến với Giày Thor - thiên đường cho những tín đồ yêu thích giày độc đáo và mạnh mẽ! Chúng tôi chuyên cung cấp các mẫu giày Thor ấn tượng, phù hợp với mọi lứa tuổi và phong cách.
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
                    <Link to={`/product_details/${product.id}`}>
                      <img
                        src={product.image || '/path/to/placeholder.jpg'} // Đổ hình ảnh từ API
                        alt={product.name}
                      />
                    </Link>
                    {/* <div className="button-group">

                      <a href="#" data-bs-toggle="modal" data-bs-target="#quick_view">
                        <span data-bs-toggle="tooltip" title="Quick View">
                          <i className="fa fa-eye" />
                        </span>
                      </a>
                    </div> */}

                  </div>
                  <div className="product-content">
                    <div className="product-caption">
                      <h6 className="product-name">
                        <Link to={`/product_details/${product.id}`}>{product.name}</Link> {/* Đổ tên sản phẩm */}
                      </h6>
                      <div className="price-box">
                        <span className="price-regular">
                          {product.price ? `${new Intl.NumberFormat('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(product.price)} Vnd` : "Liên hệ"}
                        </span>

                      </div>
                      {/* <a className="add-to-cart" >
                        
                      </a> */}
                      <Link className="add-to-cart" onClick={() => handleQuickView(product)} ><i className="fa fa-shopping-cart" /></Link>
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
        {/* <ProductTab /> */}
        {/* product tab area end */}
        {/* category area start */}
        <Category />
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
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-list">
              {products.slice(0, 8).map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-thumb">
                    <Link to={`/product_details/${product.id}`}>
                      <img
                        src={product.image || '/path/to/placeholder.jpg'} // Đổ hình ảnh từ API
                        alt={product.name}
                      />
                    </Link>
                    <div className="button-group">

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
                        <Link to={`/product_details/${product.id}`}>{product.name}</Link> {/* Đổ tên sản phẩm */}
                      </h6>
                      <div className="price-box">
                        <span className="price-regular">
                          {product.price ? `${new Intl.NumberFormat('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(product.price)} Vnd` : "Liên hệ"}
                        </span>
                      </div>
                      <Link className="add-to-cart" onClick={() => handleQuickView(product)} >
                        <i className="fa fa-shopping-cart" />
                      </Link>                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* product gallery area end */}
        {/* testimonial area start */}
        <Brand />
        {/* testimonial area end */}
        {/* latest blog area start */}
        <Blog />
        {/* latest blog area end */}
        {/* <QuickViewModal show={showQuickView} onHide={handleCloseQuickView} product={selectedProduct} /> */}

      </main>
    </div>
  );
};

export default Main;