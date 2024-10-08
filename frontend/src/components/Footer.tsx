import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="scroll-top not-visible">
        <i className="fa fa-angle-up" />
      </div>

      <footer className="black-bg">
        {/* newsletter area start */}
        <section className="newsletter-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="newsletter-wrapper text-center">
                  <h3 className="title text-white">JOIN OUR NEWSLETTER</h3>
                  <form className="newsletter-inner" id="mc-form">
                    <input
                      type="email"
                      className="news-field"
                      id="mc-email"
                      autoComplete="off"
                      placeholder="Enter your email address"
                    />
                    <button className="news-btn" id="mc-submit">
                      Subscribe
                    </button>
                  </form>
                  <h6 className="newsletter-subtitle">
                    To get the latest news from us please subscribe your email.
                  </h6>
                  {/* mailchimp-alerts Start */}
                  <div className="mailchimp-alerts">
                    <div className="mailchimp-submitting" />
                    {/* mailchimp-submitting end */}
                    <div className="mailchimp-success" />
                    {/* mailchimp-success end */}
                    <div className="mailchimp-error" />
                    {/* mailchimp-error end */}
                  </div>
                  {/* mailchimp-alerts end */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* newsletter area end */}
        <div className="footer-widget-area">
          <div className="container">
            <div className="row mtn-30">
              <div className="col-lg-3 col-sm-6">
                <div className="footer-widget-item mt-30">
                  <h6 className="widget-title">CUSTOM LINKS</h6>
                  <ul className="usefull-links">
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Order Status</a>
                    </li>
                    <li>
                      <a href="#">Returns &amp; Exchanges</a>
                    </li>
                    <li>
                      <a href="#">Size Guide</a>
                    </li>
                    <li>
                      <a href="#">Cart</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="footer-widget-item mt-30">
                  <h6 className="widget-title">PRODUCTS</h6>
                  <ul className="usefull-links">
                    <li>
                      <a href="#">Prices drop</a>
                    </li>
                    <li>
                      <a href="#">New products</a>
                    </li>
                    <li>
                      <a href="#">Best sales</a>
                    </li>
                    <li>
                      <a href="#">Contact us</a>
                    </li>
                    <li>
                      <a href="#">Sitemap</a>
                    </li>
                    <li>
                      <a href="#">Stores</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="footer-widget-item mt-30">
                  <h6 className="widget-title">OUR COMPANY</h6>
                  <ul className="usefull-links">
                    <li>
                      <a href="#">Delivery</a>
                    </li>
                    <li>
                      <a href="#">Legal Notice</a>
                    </li>
                    <li>
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <a href="#">Secure payment</a>
                    </li>
                    <li>
                      <a href="#">Contact us</a>
                    </li>
                    <li>
                      <a href="#">Sitemap</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="footer-widget-item mt-30">
                  <h6 className="widget-title">YOUR ACCOUNT</h6>
                  <ul className="usefull-links">
                    <li>
                      <a href="#">Personal info</a>
                    </li>
                    <li>
                      <a href="#">Orders</a>
                    </li>
                    <li>
                      <a href="#">Credit slips</a>
                    </li>
                    <li>
                      <a href="#">Addresses</a>
                    </li>
                    <li>
                      <a href="#">Stores</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
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
                      <img src="assets/img/logo/logo.png" alt="Brand Logo" />
                    </a>
                  </div>
                  <address className="address-info d-flex align-items-center">
                    <i className="fa fa-map-marker" />
                    <p>
                      <span>ADDRESS : </span> Your address goes here
                    </p>
                  </address>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <address className="address-info email mt-30">
                  <i className="fa fa-envelope" />
                  <p>
                    <span>EMAIL : </span>
                    <a href="emailto:demo@examplecom">demo@examplecom</a>
                  </p>
                </address>
              </div>
              <div className="col-lg-3 col-sm-6">
                <address className="address-info email mt-30">
                  <i className="fa fa-phone" />
                  <p>
                    <span>PHONE : </span>
                    <a href="tel:0123456789">0123456789</a>
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
                  <img src="assets/img/payment-2.png" alt="payment method" />
                </div>
                <div className="footer-link">
                  <a href="#">SITE MAP</a>
                  <a href="#">SEARCH TERMS</a>
                  <a href="#">ADVANCED SEARCH</a>
                  <a href="#">ORDERS AND RETURNS</a>
                  <a href="#">CONTACT US</a>
                </div>
                <p className="copyright"></p>
                <p>
                  © 2021 <b className="text-white">Pullman</b> Made with{" "}
                  <i className="fa fa-heart text-danger" /> by{" "}
                  <a href="https://hasthemes.com/">HasThemes</a>
                </p>
                <p />
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="modal" id="quick_view">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-bs-dismiss="modal">
                ×
              </button>
            </div>
            <div className="modal-body">
              {/* product details inner end */}
              <div className="product-details-inner">
                <div className="row">
                  <div className="col-lg-5">
                    <div className="product-large-slider">
                      <div className="pro-large-img">
                        <img
                          src="assets/img/product/product-details-img1.jpg"
                          alt="product-details"
                        />
                      </div>
                      <div className="pro-large-img">
                        <img
                          src="assets/img/product/product-details-img2.jpg"
                          alt="product-details"
                        />
                      </div>
                      <div className="pro-large-img">
                        <img
                          src="assets/img/product/product-details-img3.jpg"
                          alt="product-details"
                        />
                      </div>
                      <div className="pro-large-img">
                        <img
                          src="assets/img/product/product-details-img4.jpg"
                          alt="product-details"
                        />
                      </div>
                    </div>
                    <div className="pro-nav slick-row-10 slick-arrow-style">
                      <div className="pro-nav-thumb">
                        <img
                          src="assets/img/product/product-details-img1.jpg"
                          alt="product-details"
                        />
                      </div>
                      <div className="pro-nav-thumb">
                        <img
                          src="assets/img/product/product-details-img2.jpg"
                          alt="product-details"
                        />
                      </div>
                      <div className="pro-nav-thumb">
                        <img
                          src="assets/img/product/product-details-img3.jpg"
                          alt="product-details"
                        />
                      </div>
                      <div className="pro-nav-thumb">
                        <img
                          src="assets/img/product/product-details-img4.jpg"
                          alt="product-details"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="product-details-des">
                      <h3 className="product-name">
                        Premium Mens Sports Lather Keds
                      </h3>
                      <div className="ratings d-flex">
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
                        <div className="pro-review">
                          <span>1 Reviews</span>
                        </div>
                      </div>
                      <div className="price-box">
                        <span className="price-old">
                          <del>$90.00</del>
                        </span>
                        <span className="price-regular">$70.00</span>
                      </div>
                      <h5 className="offer-text">
                        <strong>Hurry up</strong>! offer ends in:
                      </h5>
                      <div
                        className="product-countdown"
                        data-countdown="2021/09/20"
                      />
                      <p className="pro-desc">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat.
                      </p>
                      <div className="quantity-cart-box d-flex align-items-center">
                        <h6 className="option-title">qty:</h6>
                        <div className="quantity">
                          <div className="pro-qty">
                            <input type="text" defaultValue={1} />
                          </div>
                        </div>
                        <div className="action_link">
                          <a className="btn btn-cart2" href="#">
                            Add To Cart
                          </a>
                        </div>
                      </div>
                      <div className="useful-links">
                        <a href="#" data-bs-toggle="tooltip" title="Compare">
                          <i className="fa fa-refresh" />
                          compare
                        </a>
                        <a href="#" data-bs-toggle="tooltip" title="Wishlist">
                          <i className="fa fa-heart-o" />
                          wishlist
                        </a>
                      </div>
                      <div className="like-icon">
                        <a className="facebook" href="#">
                          <i className="fa fa-facebook" />
                          like
                        </a>
                        <a className="twitter" href="#">
                          <i className="fa fa-twitter" />
                          tweet
                        </a>
                        <a className="pinterest" href="#">
                          <i className="fa fa-pinterest" />
                          save
                        </a>
                        <a className="google" href="#">
                          <i className="fa fa-google-plus" />
                          share
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* product details inner end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
