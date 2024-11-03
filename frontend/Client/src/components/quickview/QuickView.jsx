import React from 'react'

const QuickView = () => {
  return (
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
  )
}

export default QuickView