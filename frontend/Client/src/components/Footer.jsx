import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation(); // Hook để truy cập route hiện tại

  useEffect(() => {
    // Cuộn lên đầu trang mỗi khi route thay đổi
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) { // Hiển thị nút khi cuộn xuống 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };


  return (
    <div>
      <div className={`scroll-top ${isVisible ? 'visible' : 'not-visible'}`} onClick={scrollToTop}>
        <i className="fa fa-angle-up" />
      </div>

      <footer className="black-bg">
        {/* newsletter area start */}
        {/* newsletter area end */}
        <div className="footer-widget-area">
          <div className="container">
            <div className="row mtn-30">
              <div className="col-lg-3 col-sm-6">
                <div className="footer-widget-item mt-30">
                  <h6 className="widget-title">LIÊN KẾT TÙY CHỈNH</h6>
                  <ul className="usefull-links">
                    <li><a href="#">Chính sách bảo mật</a></li>
                    <li><a href="#">Trạng thái đơn hàng</a></li>
                    <li><a href="#">Trả lại &amp; Trao đổi</a></li>
                    <li><a href="#">Hướng dẫn kích thước</a></li>
                    <li><a href="#">giỏ hàng</a></li>
                    <li><a href="#">Câu hỏi thường gặp</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="footer-widget-item mt-30">
                  <h6 className="widget-title">CÁC SẢN PHẨM</h6>
                  <ul className="usefull-links">
                    <li><a href="#">Giá giảm</a></li>
                    <li><a href="#">Sản phẩm mới</a></li>
                    <li><a href="#">Bán chạy nhất</a></li>
                    <li><a href="#">Liên hệ với chúng tôi</a></li>
                    <li><a href="#">Sơ đồ trang web</a></li>
                    <li><a href="#">Cửa hàng</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="footer-widget-item mt-30">
                  <h6 className="widget-title">CÔNG TY CỦA CHÚNG TÔI</h6>
                  <ul className="usefull-links">
                    <li><a href="#">Vận chuyển</a></li>
                    <li><a href="#">Thông báo pháp lí</a></li>
                    <li><a href="#">Về chúng tôi</a></li>
                    <li><a href="#">Thanh toán an toàn</a></li>
                    <li><a href="#">Liên hệ với chúng tôi</a></li>
                    <li><a href="#">Sơ đồ trang web</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="footer-widget-item mt-30">
                  <h6 className="widget-title">TÀI KHOẢN CỦA BẠN</h6>
                  <ul className="usefull-links">
                    <li><a href="#">Thông tin cá nhân</a></li>
                    <li><a href="#">Đơn hàng</a></li>
                    <li><a href="#">PHiếu tín dụng</a></li>
                    <li><a href="#">Địa chỉ</a></li>
                    <li><a href="#">Cửa hàng</a></li>
                    <li><a href="#">Câu hỏi thường gặp</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-middle-area">
          <div className="container">
            <div className="row mtn-30">
              <div className="col-lg-6 col-sm-12">
                <div className="address-block mt-30">
                  <div className="footer-logo">
                    <a href="index.html">
                      <img src="/assets/img/logo/logo.png" alt="Brand Logo" />
                    </a>
                  </div>
                  <address className="address-info d-flex align-items-center">
                    <i className="fa fa-map-marker" />
                    <p>
                      <span>ĐỊA CHỈ : </span> 124 Đ. Di Trạch, Di Trạch, Từ Liêm, Hà Nội, Việt Nam
                    </p>
                  </address>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <address className="address-info email mt-30">
                  <i className="fa fa-envelope" />
                  <p>
                    <span>EMAIL : </span>
                    <a href="emailto:demo@examplecom">shoesthor@gmail.com</a>
                  </p>
                </address>
              </div>
              <div className="col-lg-3 col-sm-6">
                <address className="address-info email mt-30">
                  <i className="fa fa-phone" />
                  <p>
                    <span>PHONE : </span>
                    <a href="tel:0123456789">0969798999</a>
                  </p>
                </address>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom-area text-center">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="payment-method-list">
                  <img src="/assets/img/payment-2.png" alt="payment method" />
                </div>
                <div className="footer-link">
                  <a href="#">SITE MAP</a>
                  <a href="#">SEARCH TERMS</a>
                  <a href="#">ADVANCED SEARCH</a>
                  <a href="#">ORDERS AND RETURNS</a>
                  <a href="#">CONTACT US</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
