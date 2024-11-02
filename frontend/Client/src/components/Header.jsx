import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLoginForm } from '../hooks/useLoginForm';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '@mui/material/Badge'; // Kiểm tra đường dẫn đúng
import { loadCartFromLocalStorage, removeFromCart } from '../actions/action';

const Header = () => {
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.updateCart)
  const [localCart, setLocalCart] = useState([]);

  // useEffect(() => {
  //   const savedCart = loadCartFromLocalStorage(); // Lấy giỏ hàng từ localStorage
  //   setLocalCart(savedCart); // Lưu vào state
  //   console.log(savedCart); // In ra để kiểm tra
  // }, []);
  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);
  const handleHoverCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setLocalCart(savedCart);
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = localCart.filter(product => product.id !== id);
    setLocalCart(updatedCart); // Cập nhật local state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Cập nhật localStorage

    // Cập nhật Redux store
    dispatch(removeFromCart(id)); // Giả sử bạn có một action để xóa sản phẩm khỏi Redux store
  };
  const calculateTotal = () => {
    return localCart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  // code reload fix lỗi plugin không tải
  // const location = useLocation();
  // const prevLocation = useRef(location.pathname);
  const { userInfo } = useLoginForm();
  console.log("Thông tin người dùng trong Account_info:", userInfo);

  // useEffect(() => {

  //   if (prevLocation.current !== location.pathname) {
  //     prevLocation.current = location.pathname;
  //     window.location.reload();
  //   }
  // }, [location]);
  // code reload fix lỗi plugin không tải
  
  return (

    <header className="header-area">
      {/* main header start */}
      <div className="main-header d-none d-lg-block">
        {/* header top start */}
        <div className="header-top black-bg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="top-left-navigation"></div>
              </div>
              <div className="col-lg-6 d-flex justify-content-end">
                <div className="header-social-link">
                  <a href="#">
                    <i className="fa fa-facebook" />
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter" />
                  </a>
                  <a href="#">
                    <i className="fa fa-instagram" />
                  </a>
                  <a href="#">
                    <i className="fa fa-pinterest" />
                  </a>
                </div>
                <ul className="user-info-block">
                  <li>
                    <Link to="/my_account">
                      <i className="fa fa-user-circle" /> {userInfo?.username || 'Tài khoản'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/checkout">
                      <i className="fa fa-credit-card" /> Thanh Toán
                    </Link>
                  </li>
                  <li>
                    <a href="/register">
                      <i className="fa fa-sign-in" /> Đăng nhập
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* header top end */}
        {/* header middle area start */}
        <div className="header-main-area black-soft sticky">
          <div className="container">
            <div className="row align-items-center position-relative">
              {/* start logo area */}
              <div className="col-auto">
                <div className="logo">
                  <Link to="/">
                    <img src="/assets/img/logo/logo.png" alt="Brand Logo" />
                  </Link>
                </div>
              </div>
              {/* start logo area */}
              {/* main menu area start */}
              <div className="col-auto position-static">
                <div className="main-menu-area">
                  <div className="main-menu">
                    {/* main menu navbar start */}
                    <nav className="desktop-menu">
                      <ul>
                        <li className="position-static">
                          <Link to="/">
                            Trang chủ
                          </Link>

                        </li>

                        <li>
                          <Link to="/shop">
                            Cửa hàng
                          </Link>

                        </li>
                        <li>
                          <Link to="/blog">
                            Tin tức</Link>
                        </li>
                        <li>
                          <Link to="/contact_us">
                            Liên hệ</Link>
                        </li>
                        <li>
                          <Link to="/faqs">
                            Hỏi đáp
                          </Link>
                        </li>
                      </ul>
                    </nav>
                    {/* main menu navbar end */}
                  </div>
                </div>
              </div>
              {/* main menu area end */}
              {/* mini cart area start */}
              <div className="col-auto ms-auto">
                <div className="header-right">
                  <div className="header-configure-area">
                    <ul className="nav">
                      <li>
                        <a href="#" className="search-trigger">
                          <i className="fa fa-search" />
                        </a>
                      </li>
                      {/* minicart của header */}
                      <li className="mini-cart-wrap">
                        <Link to="/cart" className="minicart-btn">

                          <Badge badgeContent={cart.length} color="success">
                            <i className="fa fa-shopping-cart" />
                          </Badge>
                        </Link>
                        <div className="cart-list-wrapper" onMouseEnter={handleHoverCart}>
                          <ul className="cart-list">
                            {localCart.map((product) => (
                              <li key={product.id}>
                                <div className="cart-img">
                                  <Link to={`/product/${product.id}`}>
                                    <img src={product.image} alt={product.name} />
                                  </Link>
                                </div>
                                <div className="cart-info">
                                  <h6 className="product-name">
                                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                                  </h6>
                                  <span className="cart-qty">Số lượng: {product.quantity}</span>
                                  <span className="item-price">{(product.price * product.quantity).toFixed(2)}Vnd</span>
                                </div>
                                <div className="del-icon" onClick={() => handleRemoveFromCart(product.id)}>
                                  <i className="fa fa-times" />
                                </div>

                              </li>
                            ))}
                          </ul>
                          <ul className="minicart-pricing-box">
                            <li className="total">
                              <span>Total</span>
                              <span>
                                <strong>{calculateTotal().toLocaleString()} Vnd</strong>
                              </span>
                            </li>
                          </ul>
                          <div className="minicart-button">
                            <Link to="/cart">
                              <i className="fa fa-shopping-cart" /> View Cart
                            </Link>
                            <Link to="/checkout">
                              <i className="fa fa-share" /> Checkout
                            </Link>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* mini cart area end */}
            </div>
          </div>
        </div>
        {/* header middle area end */}
      </div>
      {/* main header start */}
      {/* mobile header start */}
      {/* mobile header start */}
      <div className="mobile-header d-lg-none d-md-block sticky black-soft">
        {/*mobile header top start */}
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="mobile-main-header">
                <div className="mobile-logo">
                  <Link to="/">
                    <img src="assets/img/logo/logo.png" alt="Brand Logo" />
                  </Link>
                </div>
                <div className="mobile-menu-toggler">
                  <div className="mini-cart-wrap">
                    <Link to="/cart">
                      <i className="fa fa-shopping-cart" />
                      <div className="notification">0</div>
                    </Link>
                  </div>
                  <button className="mobile-menu-btn">
                    <span />
                    <span />
                    <span />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* mobile header top start */}
      </div>
      {/* mobile header end */}
      {/* mobile header end */}
      {/* offcanvas mobile menu start */}
      {/* off-canvas menu start */}
      <aside className="off-canvas-wrapper">
        <div className="off-canvas-overlay" />
        <div className="off-canvas-inner-content">
          <div className="btn-close-off-canvas">
            <i className="fa fa-close" />
          </div>
          <div className="off-canvas-inner">
            {/* search box start */}
            <div className="search-box-offcanvas">
              <form>
                <input type="text" placeholder="Search Here..." />
                <button className="search-btn">
                  <i className="fa fa-search" />
                </button>
              </form>
            </div>
            {/* mobile menu end */}
            <div className="mobile-settings">
              <ul className="nav">
                <li>
                  <div className="dropdown mobile-top-dropdown">
                    <a
                      href="#"
                      className="dropdown-toggle"
                      id="myaccount"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Tài Khoản
                      <i className="fa fa-angle-down" />
                    </a>
                    <div className="dropdown-menu" aria-labelledby="myaccount">


                      <Link className="dropdown-item" to="/my-account">
                        Tài Khoản
                      </Link>
                      <a className="dropdown-item" href="login">
                        {" "}
                        Đăng Nhập
                      </a>
                      <a className="dropdown-item" href="register">
                        Đăng kí
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {/* offcanvas widget area start */}
            <div className="offcanvas-widget-area">
              <div className="off-canvas-social-widget">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-pinterest-p" />
                </a>
                <a href="#">
                  <i className="fa fa-linkedin" />
                </a>
                <a href="#">
                  <i className="fa fa-youtube-play" />
                </a>
              </div>
            </div>
            {/* offcanvas widget area end */}
          </div>
        </div>
      </aside>
      {/* off-canvas menu end */}
      {/* offcanvas mobile menu end */}
    </header>

  );
};
export default Header;