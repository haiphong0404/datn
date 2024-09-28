<<<<<<< HEAD
import React from "react";
import { Link } from 'react-router-dom';

const Header = () => {
=======
import { useEffect, useRef  } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  // code reload fix lỗi plugin không tải
  const location = useLocation();
  const prevLocation = useRef(location.pathname);

  useEffect(() => {
 
    if (prevLocation.current !== location.pathname) {
      prevLocation.current = location.pathname;
      window.location.reload();
    }
  }, [location]);
  // code reload fix lỗi plugin không tải
>>>>>>> main
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
                      <i className="fa fa-user-circle" /> My Account
                    </Link>
                  </li>
                  <li>
                    <Link to="/checkout">
                      <i className="fa fa-credit-card" /> Checkout
                    </Link>
                  </li>
                  <li>
                    <a href="login-register.html">
                      <i className="fa fa-sign-in" /> Sign In
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
                        <li className="active">
                          <Link to="/">
                            Home 
                          </Link>
                          
                        </li>
                        <li className="position-static">
                          <a href="#">
                            pages <i className="fa fa-angle-down" />
                          </a>
                          <ul className="megamenu dropdown">
                            <li className="mega-title">
                              <span>column 01</span>
                              <ul>
                                <li>
                                  <Link to="/shop">
<<<<<<< HEAD
                                    shop grid left sidebar
=======
                                    shop
>>>>>>> main
                                  </Link>
                                </li>
                              </ul>
                            </li>
                            <li className="mega-title">
                              <span>column 02</span>
                              <ul>
                                <li>
                                  <Link to="/product_details">
                                    product details
                                  </Link>
                                </li>
                              </ul>
                            </li>
                            <li className="mega-title">
                              <span>column 03</span>
                              <ul>
                                <li>
                                  <Link to="/cart">
                                    cart
                                  </Link>
                                </li>
                                <li>

                                  <Link to="/checkout">
                                    checkout
                                  </Link>

                                </li>

                              </ul>
                            </li>
                            <li className="mega-title">
                              <span>column 04</span>
                              <ul>
                                <li>

                                  <Link to="/my_account">
                                    my-account
                                  </Link>

                                </li>
                                <li>
                                  <a href="login-register.html">
                                    login-register
                                  </a>
                                </li>
                                <li>

                                  <Link to="/about_us">
                                    about us
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/contact_us">
                                    contact us
                                  </Link>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to="/shop">
                            shop <i className="fa fa-angle-down" />
                          </Link>
                          <ul className="dropdown">
                            <li>
                              <Link to="#" className="shop-link">
                                Shop{" "}
                                <i className="fa fa-angle-right" />
                              </Link>
                              <ul className="dropdown">
                                <li>
                                  <Link to="/shop" className="shop-grid-left-sidebar">
                                    shop
                                  </Link>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <Link to="/product-details" className="products-details">
                                products details <i className="fa fa-angle-right" />
                              </Link>
                              <ul className="dropdown">
                                <li>
                                  <Link to="/product_details">
                                    product details
                                  </Link>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to="/blog">
                            blog</Link>
                        </li>
                        <li>
                          <Link to="/contact_us">
                            Contact us</Link>
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
                        <Link to="cart" className="minicart-btn">
                          <i className="fa fa-shopping-cart" />
                          <span className="notification">2</span>
                        </Link>
                        <div className="cart-list-wrapper">
                          <ul className="cart-list">
                            <li>
                              <div className="cart-img">
                                <a href="product-details.html">
                                  <img
                                    src="assets/img/cart/cart-1.jpg"
                                    alt=""
                                  />
                                </a>
                              </div>
                              <div className="cart-info">
                                <h6 className="product-name">
                                  <a href="product-details.html">
                                    7th Generation classic
                                  </a>
                                </h6>
                                <span className="cart-qty">Qty: 1</span>
                                <span className="item-price">$60.00</span>
                              </div>
                              <div className="del-icon">
                                <i className="fa fa-times" />
                              </div>
                            </li>
                            <li>
                              <div className="cart-img">
                                <a href="product-details.html">
                                  <img
                                    src="assets/img/cart/cart-2.jpg"
                                    alt=""
                                  />
                                </a>
                              </div>
                              <div className="cart-info">
                                <h6 className="product-name">
                                  <a href="product-details.html">
                                    Digital 8th generation
                                  </a>
                                </h6>
                                <span className="cart-qty">Qty: 2</span>
                                <span className="item-price">$70.00</span>
                              </div>
                              <div className="del-icon">
                                <i className="fa fa-times" />
                              </div>
                            </li>
                          </ul>
                          <ul className="minicart-pricing-box">
                            <li>
                              <span>Sub-Total</span>
                              <span>
                                <strong>$300.00</strong>
                              </span>
                            </li>
                            <li>
                              <span>Eco Tax (-2.00)</span>
                              <span>
                                <strong>$10.00</strong>
                              </span>
                            </li>
                            <li>
                              <span>VAT (20%)</span>
                              <span>
                                <strong>$60.00</strong>
                              </span>
                            </li>
                            <li className="total">
                              <span>Total</span>
                              <span>
                                <strong>$370.00</strong>
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
            {/* search box end */}
            {/* mobile menu start */}
            <div className="mobile-navigation">
              {/* mobile menu navigation start */}
              <nav>
                <ul className="mobile-menu">
                  <li className="menu-item-has-children">
                    <Link to="/">
                      Home
                    </Link>
                    <ul className="dropdown">
                      <li>
                        <Link to="/">
                          Home
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">pages</a>
                    <ul className="megamenu dropdown">
                      <li className="mega-title menu-item-has-children">
                        <a href="#">column 01</a>
                        <ul className="dropdown">
                          <li>
                            <Link to="/shop">
                              shop
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="mega-title menu-item-has-children">
                        <a href="#">column 02</a>
                        <ul className="dropdown">
                          <li>

                            <Link to="/product_details">
                              product details
                            </Link>

                          </li>
                        </ul>
                      </li>
                      <li className="mega-title menu-item-has-children">
                        <a href="#">column 03</a>
                        <ul className="dropdown">
                          <li>

                            <Link to="/cart">
                              cart
                            </Link>

                          </li>
                          <li>

                            <Link to="/checkout">
                              checkout
                            </Link>

                          </li>
                          <li>
                            <a href="compare.html">compare</a>
                          </li>
                          <li>
                            <a href="wishlist.html">wishlist</a>
                          </li>
                        </ul>
                      </li>
                      <li className="mega-title menu-item-has-children">
                        <a href="#">column 04</a>
                        <ul className="dropdown">
                          <li>

                            <Link to="/my-account">
                              my-account
                            </Link>

                          </li>
                          <li>
                            <a href="login-register.html">login-register</a>
                          </li>
                          <li>

                            <Link to="/about_us">
                              about us
                            </Link>
                          </li>
                          <li>
                            <Link to="/contact_us">
                              Contact us</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children ">
                    <a href="#">shop</a>
                    <ul className="dropdown">

                      <li className="menu-item-has-children">
                        <a href="#">products details</a>
                        <ul className="dropdown">
                          <li>
                            <Link to="/product-details">
                              product details
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children ">
                    <Link to="/blog">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact_us">
                      Contact us</Link>
                  </li>
                </ul>
              </nav>
              {/* mobile menu navigation end */}
            </div>
            {/* mobile menu end */}
            <div className="mobile-settings">
              <ul className="nav">
                <li>
                 
                </li>
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
                      My Account
                      <i className="fa fa-angle-down" />
                    </a>
                    <div className="dropdown-menu" aria-labelledby="myaccount">


                      <Link className="dropdown-item" to="/my-account">
                        my account
                      </Link>
                      <a className="dropdown-item" href="login-register.html">
                        {" "}
                        login
                      </a>
                      <a className="dropdown-item" href="login-register.html">
                        register
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {/* offcanvas widget area start */}
            <div className="offcanvas-widget-area">
              <div className="off-canvas-contact-widget">
                <ul>
                  <li>
                    <i className="fa fa-mobile" />
                    <a href="#">0123456789</a>
                  </li>
                  <li>
                    <i className="fa fa-envelope-o" />
                    <a href="#">info@yourdomain.com</a>
                  </li>
                </ul>
              </div>
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
