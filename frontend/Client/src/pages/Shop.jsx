import React from "react";

const Shop = () => {
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
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Shop
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
        <div className="shop-main-wrapper section-padding">
          <div className="container">
            <div className="row">
              {/* sidebar area start */}
              <div className="col-lg-3 order-2 order-lg-1">
                <aside className="sidebar-wrapper">
                  {/* single sidebar start */}
                  <div className="sidebar-single">
                    <h6 className="sidebar-title">Categories</h6>
                    <div className="sidebar-body">
                      <ul className="checkbox-container search-list">
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck1"
                            >
                              Mens (3)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck2"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck2"
                            >
                              Womens (4)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck3"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck3"
                            >
                              Kids (15)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck4"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck4"
                            >
                              Sports (10)
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* single sidebar end */}
                  {/* single sidebar start */}
                  <div className="sidebar-single">
                    <h6 className="sidebar-title">Brand</h6>
                    <div className="sidebar-body">
                      <ul className="checkbox-container search-list">
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck5"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck5"
                            >
                              Studio (3)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck6"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck6"
                            >
                              Hastech (4)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck7"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck7"
                            >
                              Quickiin (15)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck8"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck8"
                            >
                              Graphic corner (10)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck9"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck9"
                            >
                              devItems (12)
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* single sidebar end */}
                  {/* single sidebar start */}
                  <div className="sidebar-single">
                    <h6 className="sidebar-title">Categories</h6>
                    <div className="sidebar-body">
                      <ul className="radio-container search-list">
                        <li>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="customCheck50"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck50"
                            >
                              $7.00 - $9.00 (2)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="customCheck51"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck51"
                            >
                              $10.00 - $12.00 (3)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="customCheck52"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck52"
                            >
                              $17.00 - $20.00 (3)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="customCheck53"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck53"
                            >
                              {" "}
                              $21.00 - $22.00 (1)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="customCheck54"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck54"
                            >
                              $25.00 - $30.00 (3)
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* single sidebar end */}
                  {/* single sidebar start */}
                  <div className="sidebar-single">
                    <h6 className="sidebar-title">color</h6>
                    <div className="sidebar-body">
                      <ul className="checkbox-container search-list">
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck11"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck11"
                            >
                              green (5)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck12"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck12"
                            >
                              black (20)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck13"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck13"
                            >
                              red (6)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck14"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck14"
                            >
                              blue (8)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck15"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck15"
                            >
                              pink (4)
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* single sidebar end */}
                  {/* single sidebar start */}
                  <div className="sidebar-single">
                    <h6 className="sidebar-title">size</h6>
                    <div className="sidebar-body">
                      <ul className="checkbox-container search-list">
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck111"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck111"
                            >
                              S (4)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck222"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck222"
                            >
                              M (5)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck333"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck333"
                            >
                              L (7)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck444"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck444"
                            >
                              XL (3)
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* single sidebar end */}
                  {/* single sidebar start */}
                  <div className="sidebar-banner">
                    <div className="banner-thumb">
                      <a href="#">
                        <img
                          src="assets/img/banner/sidebar-banner.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  {/* single sidebar end */}
                </aside>
              </div>
              {/* sidebar area end */}
              {/* shop main wrapper start */}
              <div className="col-lg-9 order-1 order-lg-2">
                <div className="shop-product-wrapper">
                  {/* shop product top wrap start */}
                  <div className="shop-top-bar">
                    <div className="row align-items-center">
                      <div className="col-lg-7 col-md-6 order-2 order-md-1">
                        <div className="top-bar-left">
                          <div className="product-view-mode">
                            <a
                              className="active"
                              href="#"
                              data-target="grid-view"
                              data-bs-toggle="tooltip"
                              title="Grid View"
                            >
                              <i className="fa fa-th" />
                            </a>
                            <a
                              href="#"
                              data-target="list-view"
                              data-bs-toggle="tooltip"
                              title="List View"
                            >
                              <i className="fa fa-list" />
                            </a>
                          </div>
                          <div className="product-amount">
                            <p>Showing 1–16 of 21 results</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6 order-1 order-md-2">
                        <div className="top-bar-right">
                          <div className="product-short">
                            <p>Sort By : </p>
                            <select className="nice-select" name="sortby">
                              <option value="trending">Relevance</option>
                              <option value="sales">Name (A - Z)</option>
                              <option value="sales">Name (Z - A)</option>
                              <option value="rating">
                                Price (Low &gt; High)
                              </option>
                              <option value="date">Rating (Lowest)</option>
                              <option value="price-asc">Model (A - Z)</option>
                              <option value="price-asc">Model (Z - A)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* shop product top wrap start */}
                  {/* product item list wrapper start */}
                  <div className="shop-product-wrap grid-view row mbn-30">
                    {/* product single item start */}
                    <div className="col-md-4 col-sm-6">
                      {/* product grid start */}
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
                      {/* product grid end */}
                      {/* product list item end */}
                      <div className="product-list-item">
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
                        <div className="product-content-list">
                          <h4 className="product-name">
                            <a href="product-details.html">
                              Quickiin Mens shoes
                            </a>
                          </h4>
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
                          <div className="price-box">
                            <span className="price-old">
                              <del>$29.99</del>
                            </span>
                            <span className="price-regular">$50.00</span>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Unde perspiciatis quod numquam, sit fugiat,
                            deserunt ipsa mollitia sunt quam.
                          </p>
                          <a
                            href="cart.html"
                            className="btn btn-large hover-color"
                          >
                            Add To Cart
                          </a>
                        </div>
                      </div>
                      {/* product list item end */}
                    </div>
                    {/* product single item start */}
                    {/* product single item start */}
                    <div className="col-md-4 col-sm-6">
                      {/* product grid start */}
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
                                Womens High Hills
                              </a>
                            </h6>
                            <div className="price-box">
                              <span className="price-old">
                                <del>$85.00</del>
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
                      {/* product grid end */}
                      {/* product list item end */}
                      <div className="product-list-item">
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
                        <div className="product-content-list">
                          <h4 className="product-name">
                            <a href="product-details.html">Womens High Hills</a>
                          </h4>
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
                          <div className="price-box">
                            <span className="price-old">
                              <del>$85.00</del>
                            </span>
                            <span className="price-regular">$70.00</span>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Unde perspiciatis quod numquam, sit fugiat,
                            deserunt ipsa mollitia sunt quam.
                          </p>
                          <a
                            href="cart.html"
                            className="btn btn-large hover-color"
                          >
                            Add To Cart
                          </a>
                        </div>
                      </div>
                      {/* product list item end */}
                    </div>
                    {/* product single item start */}
                    {/* product single item start */}
                    <div className="col-md-4 col-sm-6">
                      {/* product grid start */}
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
                                <del>$70.00</del>
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
                      {/* product grid end */}
                      {/* product list item end */}
                      <div className="product-list-item">
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
                        <div className="product-content-list">
                          <h4 className="product-name">
                            <a href="product-details.html">
                              QLeather Mens slippers
                            </a>
                          </h4>
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
                          <div className="price-box">
                            <span className="price-old">
                              <del>$90</del>
                            </span>
                            <span className="price-regular">$60.00</span>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Unde perspiciatis quod numquam, sit fugiat,
                            deserunt ipsa mollitia sunt quam.
                          </p>
                          <a
                            href="cart.html"
                            className="btn btn-large hover-color"
                          >
                            Add To Cart
                          </a>
                        </div>
                      </div>
                      {/* product list item end */}
                    </div>
                    {/* product single item start */}
                    {/* product single item start */}
                    <div className="col-md-4 col-sm-6">
                      {/* product grid start */}
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
                      {/* product grid end */}
                      {/* product list item end */}
                      <div className="product-list-item">
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
                        </div>
                        <div className="product-content-list">
                          <h4 className="product-name">
                            <a href="product-details.html">
                              Rexpo Womens shoes
                            </a>
                          </h4>
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
                          <div className="price-box">
                            <span className="price-regular">$70.00</span>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Unde perspiciatis quod numquam, sit fugiat,
                            deserunt ipsa mollitia sunt quam.
                          </p>
                          <a
                            href="cart.html"
                            className="btn btn-large hover-color"
                          >
                            Add To Cart
                          </a>
                        </div>
                      </div>
                      {/* product list item end */}
                    </div>
                    {/* product single item start */}
                    {/* product single item start */}
                    <div className="col-md-4 col-sm-6">
                      {/* product grid start */}
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
                      {/* product grid end */}
                      {/* product list item end */}
                      <div className="product-list-item">
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
                        <div className="product-content-list">
                          <h4 className="product-name">
                            <a href="product-details.html">
                              Primitive Mens shoes
                            </a>
                          </h4>
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
                          <div className="price-box">
                            <span className="price-regular">$60.00</span>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Unde perspiciatis quod numquam, sit fugiat,
                            deserunt ipsa mollitia sunt quam.
                          </p>
                          <a
                            href="cart.html"
                            className="btn btn-large hover-color"
                          >
                            Add To Cart
                          </a>
                        </div>
                      </div>
                      {/* product list item end */}
                    </div>
                    {/* product single item start */}
                    {/* product single item start */}
                    <div className="col-md-4 col-sm-6">
                      {/* product grid start */}
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
                                Quickiin Mens shoes
                              </a>
                            </h6>
                            <div className="price-box">
                              <span className="price-old">
                                <del>$80.00</del>
                              </span>
                              <span className="price-regular">$40.00</span>
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
                      {/* product grid end */}
                      {/* product list item end */}
                      <div className="product-list-item">
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
                              <span data-bs-toggle="tooltip" title="Quick View">
                                <i className="fa fa-eye" />
                              </span>
                            </a>
                          </div>
                          <div className="product-label">
                            <span>new</span>
                          </div>
                        </div>
                        <div className="product-content-list">
                          <h4 className="product-name">
                            <a href="product-details.html">
                              Quickiin Mens shoes
                            </a>
                          </h4>
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
                          <div className="price-box">
                            <span className="price-old">
                              <del>$80.00</del>
                            </span>
                            <span className="price-regular">$40.00</span>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Unde perspiciatis quod numquam, sit fugiat,
                            deserunt ipsa mollitia sunt quam.
                          </p>
                          <a
                            href="cart.html"
                            className="btn btn-large hover-color"
                          >
                            Add To Cart
                          </a>
                        </div>
                      </div>
                      {/* product list item end */}
                    </div>
                    {/* product single item start */}
                    {/* product single item start */}
                    <div className="col-md-4 col-sm-6">
                      {/* product grid start */}
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
                                Womens High Hills
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
                      {/* product grid end */}
                      {/* product list item end */}
                      <div className="product-list-item">
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
                              <span data-bs-toggle="tooltip" title="Quick View">
                                <i className="fa fa-eye" />
                              </span>
                            </a>
                          </div>
                          <div className="product-label">
                            <span>new</span>
                          </div>
                        </div>
                        <div className="product-content-list">
                          <h4 className="product-name">
                            <a href="product-details.html">Womens High Hills</a>
                          </h4>
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
                          <div className="price-box">
                            <span className="price-old">
                              <del>$30.00</del>
                            </span>
                            <span className="price-regular">$25.00</span>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Unde perspiciatis quod numquam, sit fugiat,
                            deserunt ipsa mollitia sunt quam.
                          </p>
                          <a
                            href="cart.html"
                            className="btn btn-large hover-color"
                          >
                            Add To Cart
                          </a>
                        </div>
                      </div>
                      {/* product list item end */}
                    </div>
                    {/* product single item start */}
                    {/* product single item start */}
                    <div className="col-md-4 col-sm-6">
                      {/* product grid start */}
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
                              <a href="product-details.html">
                                LEATHER MENS SLIPPERS
                              </a>
                            </h6>
                            <div className="price-box">
                              <span className="price-old">
                                <del>$40.00</del>
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
                      {/* product grid end */}
                      {/* product list item end */}
                      <div className="product-list-item">
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
                        <div className="product-content-list">
                          <h4 className="product-name">
                            <a href="product-details.html">
                              LEATHER MENS SLIPPERS
                            </a>
                          </h4>
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
                          <div className="price-box">
                            <span className="price-old">
                              <del>$40.00</del>
                            </span>
                            <span className="price-regular">$50.00</span>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Unde perspiciatis quod numquam, sit fugiat,
                            deserunt ipsa mollitia sunt quam.
                          </p>
                          <a
                            href="cart.html"
                            className="btn btn-large hover-color"
                          >
                            Add To Cart
                          </a>
                        </div>
                      </div>
                      {/* product list item end */}
                    </div>
                    {/* product single item start */}
                    {/* product single item start */}
                    <div className="col-md-4 col-sm-6">
                      {/* product grid start */}
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
                                Womens High Hills
                              </a>
                            </h6>
                            <div className="price-box">
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
                      {/* product grid end */}
                      {/* product list item end */}
                      <div className="product-list-item">
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
                              <span data-bs-toggle="tooltip" title="Quick View">
                                <i className="fa fa-eye" />
                              </span>
                            </a>
                          </div>
                          <div className="product-label">
                            <span>new</span>
                          </div>
                        </div>
                        <div className="product-content-list">
                          <h4 className="product-name">
                            <a href="product-details.html">Womens High Hills</a>
                          </h4>
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
                          <div className="price-box">
                            <span className="price-regular">$60.00</span>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Unde perspiciatis quod numquam, sit fugiat,
                            deserunt ipsa mollitia sunt quam.
                          </p>
                          <a
                            href="cart.html"
                            className="btn btn-large hover-color"
                          >
                            Add To Cart
                          </a>
                        </div>
                      </div>
                      {/* product list item end */}
                    </div>
                    {/* product single item start */}
                    {/* product single item start */}
                    <div className="col-md-4 col-sm-6">
                      {/* product grid start */}
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
                                Quickiin Mens shoes
                              </a>
                            </h6>
                            <div className="price-box">
                              <span className="price-regular">$75.00</span>
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
                      {/* product grid end */}
                      {/* product list item end */}
                      <div className="product-list-item">
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
                              <span data-bs-toggle="tooltip" title="Quick View">
                                <i className="fa fa-eye" />
                              </span>
                            </a>
                          </div>
                          <div className="product-label">
                            <span>new</span>
                          </div>
                        </div>
                        <div className="product-content-list">
                          <h4 className="product-name">
                            <a href="product-details.html">
                              Quickiin Mens shoes
                            </a>
                          </h4>
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
                          <div className="price-box">
                            <span className="price-regular">$55.00</span>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Unde perspiciatis quod numquam, sit fugiat,
                            deserunt ipsa mollitia sunt quam.
                          </p>
                          <a
                            href="cart.html"
                            className="btn btn-large hover-color"
                          >
                            Add To Cart
                          </a>
                        </div>
                      </div>
                      {/* product list item end */}
                    </div>
                    {/* product single item start */}
                    {/* product single item start */}
                    <div className="col-md-4 col-sm-6">
                      {/* product grid start */}
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
                                LEATHER MENS SLIPPERS
                              </a>
                            </h6>
                            <div className="price-box">
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
                      {/* product grid end */}
                      {/* product list item end */}
                      <div className="product-list-item">
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
                        <div className="product-content-list">
                          <h4 className="product-name">
                            <a href="product-details.html">
                              LEATHER MENS SLIPPERS
                            </a>
                          </h4>
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
                          <div className="price-box">
                            <span className="price-regular">$50.00</span>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Unde perspiciatis quod numquam, sit fugiat,
                            deserunt ipsa mollitia sunt quam.
                          </p>
                          <a
                            href="cart.html"
                            className="btn btn-large hover-color"
                          >
                            Add To Cart
                          </a>
                        </div>
                      </div>
                      {/* product list item end */}
                    </div>
                    {/* product single item start */}
                    {/* product single item start */}
                    <div className="col-md-4 col-sm-6">
                      {/* product grid start */}
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
                                REXPO WOMENS SHOES
                              </a>
                            </h6>
                            <div className="price-box">
                              <span className="price-regular">$90.00</span>
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
                      {/* product grid end */}
                      {/* product list item end */}
                      <div className="product-list-item">
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
                        <div className="product-content-list">
                          <h4 className="product-name">
                            <a href="product-details.html">
                              REXPO WOMENS SHOES
                            </a>
                          </h4>
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
                          <div className="price-box">
                            <span className="price-regular">$90.00</span>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Unde perspiciatis quod numquam, sit fugiat,
                            deserunt ipsa mollitia sunt quam.
                          </p>
                          <a
                            href="cart.html"
                            className="btn btn-large hover-color"
                          >
                            Add To Cart
                          </a>
                        </div>
                      </div>
                      {/* product list item end */}
                    </div>
                    {/* product single item start */}
                  </div>
                  {/* product item list wrapper end */}
                  {/* start pagination area */}
                  <div className="paginatoin-area text-center">
                    <ul className="pagination-box">
                      <li>
                        <a className="previous" href="#">
                          <i className="fa fa-angle-left" />
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">1</a>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <li>
                        <a className="next" href="#">
                          <i className="fa fa-angle-right" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* end pagination area */}
                </div>
              </div>
              {/* shop main wrapper end */}
            </div>
          </div>
        </div>
        {/* page main wrapper end */}
      </main>
    </div>
  );
};
export default Shop;
