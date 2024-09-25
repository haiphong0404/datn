import React from 'react';

const Product_details = () => {
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
              <h3 className="breadcrumb-title">SHOP</h3>
              <ul className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <a href="index.html">
                    <i className="fa fa-home" />
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="shop.html">Shop</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Product Details
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* breadcrumb area end */}
  {/* page main wrapper start */}
  <div className="shop-main-wrapper section-padding pb-0">
    <div className="container">
      <div className="row">
        {/* product details wrapper start */}
        <div className="col-lg-12 order-1 order-lg-2">
          {/* product details inner end */}
          <div className="product-details-inner">
            <div className="row">
              <div className="col-lg-5">
                <div className="product-large-slider">
                  <div className="pro-large-img img-zoom">
                    <img
                      src="assets/img/product/product-details-img1.jpg"
                      alt="product-details"
                    />
                  </div>
                  <div className="pro-large-img img-zoom">
                    <img
                      src="assets/img/product/product-details-img2.jpg"
                      alt="product-details"
                    />
                  </div>
                  <div className="pro-large-img img-zoom">
                    <img
                      src="assets/img/product/product-details-img3.jpg"
                      alt="product-details"
                    />
                  </div>
                  <div className="pro-large-img img-zoom">
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
                  <div className="availability">
                    <i className="fa fa-check-circle" />
                    <span>200 in stock</span>
                  </div>
                  <p className="pro-desc">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. Phasellus id nisi quis
                    justo tempus mollis sed et dui. In hac habitasse platea
                    dictumst.
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
          </div>
          {/* product details inner end */}
          {/* product details reviews start */}
          <div className="product-details-reviews section-padding pb-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="product-review-info">
                  <ul className="nav review-tab">
                    <li>
                      <a
                        className="active"
                        data-bs-toggle="tab"
                        href="#tab_one"
                      >
                        description
                      </a>
                    </li>
                    <li>
                      <a data-bs-toggle="tab" href="#tab_two">
                        information
                      </a>
                    </li>
                    <li>
                      <a data-bs-toggle="tab" href="#tab_three">
                        reviews (1)
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content reviews-tab">
                    <div className="tab-pane fade show active" id="tab_one">
                      <div className="tab-one">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nam fringilla augue nec est tristique auctor.
                          Ipsum metus feugiat sem, quis fermentum turpis eros
                          eget velit. Donec ac tempus ante. Fusce ultricies
                          massa massa. Fusce aliquam, purus eget sagittis
                          vulputate, sapien libero hendrerit est, sed commodo
                          augue nisi non neque.Cras neque metus, consequat et
                          blandit et, luctus a nunc. Etiam gravida vehicula
                          tellus, in imperdiet ligula euismod eget. Pellentesque
                          habitant morbi tristique senectus et netus et
                          malesuada fames ac turpis egestas. Nam erat mi, rutrum
                          at sollicitudin rhoncus
                        </p>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="tab_two">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <td>color</td>
                            <td>black, blue, red</td>
                          </tr>
                          <tr>
                            <td>size</td>
                            <td>L, M, S</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="tab-pane fade" id="tab_three">
                      <form action="#" className="review-form">
                        <h5>
                          1 review for <span>Chaz Kangeroo</span>
                        </h5>
                        <div className="total-reviews">
                          <div className="rev-avatar">
                            <img src="assets/img/about/avatar.jpg" alt="" />
                          </div>
                          <div className="review-box">
                            <div className="ratings">
                              <span className="good">
                                <i className="fa fa-star" />
                              </span>
                              <span className="good">
                                <i className="fa fa-star" />
                              </span>
                              <span className="good">
                                <i className="fa fa-star" />
                              </span>
                              <span className="good">
                                <i className="fa fa-star" />
                              </span>
                              <span>
                                <i className="fa fa-star" />
                              </span>
                            </div>
                            <div className="post-author">
                              <p>
                                <span>admin -</span> 30 Mar, 2021
                              </p>
                            </div>
                            <p>
                              Aliquam fringilla euismod risus ac bibendum. Sed
                              sit amet sem varius ante feugiat lacinia. Nunc
                              ipsum nulla, vulputate ut venenatis vitae,
                              malesuada ut mi. Quisque iaculis, dui congue
                              placerat pretium, augue erat accumsan lacus
                            </p>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col">
                            <label className="col-form-label">
                              <span className="text-danger">*</span>
                              Your Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              required=""
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col">
                            <label className="col-form-label">
                              <span className="text-danger">*</span>
                              Your Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              required=""
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col">
                            <label className="col-form-label">
                              <span className="text-danger">*</span>
                              Your Review
                            </label>
                            <textarea
                              className="form-control"
                              required=""
                              defaultValue={""}
                            />
                            <div className="help-block pt-10">
                              <span className="text-danger">Note:</span>
                              HTML is not translated!
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col">
                            <label className="col-form-label">
                              <span className="text-danger">*</span>
                              Rating
                            </label>
                            &nbsp;&nbsp;&nbsp; Bad&nbsp;
                            <input
                              type="radio"
                              defaultValue={1}
                              name="rating"
                            />
                            &nbsp;
                            <input
                              type="radio"
                              defaultValue={2}
                              name="rating"
                            />
                            &nbsp;
                            <input
                              type="radio"
                              defaultValue={3}
                              name="rating"
                            />
                            &nbsp;
                            <input
                              type="radio"
                              defaultValue={4}
                              name="rating"
                            />
                            &nbsp;
                            <input
                              type="radio"
                              defaultValue={5}
                              name="rating"
                              defaultChecked=""
                            />
                            &nbsp;Good
                          </div>
                        </div>
                        <div className="buttons">
                          <button className="btn btn-sqr" type="submit">
                            Continue
                          </button>
                        </div>
                      </form>{" "}
                      {/* end of review-form */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* product details reviews end */}
        </div>
        {/* product details wrapper end */}
      </div>
    </div>
  </div>
  {/* page main wrapper end */}
  {/* Related product area start */}
  <section className="product-gallery section-padding">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="section-title text-center">
            <h3 className="title">RELATED PRODUCT</h3>
            <h4 className="sub-title">
              Investigationes demonstraverunt lectores legere me lius quod ii
              legunt saepius claritas est etiam processus dynamicus, qui
              sequitur mutationem.
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
                    <a href="product-details.html">Womens High Hills</a>
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
                    <a href="product-details.html">Leather Mens slippers</a>
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
                    <a href="product-details.html">Primitive Mens shoes</a>
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
  {/* Related product area end */}
</main>

</div>

  );
};
export default Product_details;