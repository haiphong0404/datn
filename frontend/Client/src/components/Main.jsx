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



const Main = () => {
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
                        <span className="price-regular">{product.price ? `${product.price} Vnd` : "Liên hệ"}</span>

                      </div>
                      {/* <a className="add-to-cart" >
                        
                      </a> */}
                      <Link className="add-to-cart" to={`/product_details/${product.id}`} ><i className="fa fa-shopping-cart" /></Link>
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
        <ProductTab />
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
                        <span className="price-regular">{product.price} Vnd</span> {/* Đổ giá hiện tại */}
                      </div>
                      <Link className="add-to-cart" to={`/product_details/${product.id}`}><i className="fa fa-shopping-cart" /></Link>
                    </div>

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
      </main>
    </div>
  );
};

export default Main;