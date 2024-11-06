

import React from 'react';
import Details from './Details';
import ProductReview from './ProductReview';
const Product_details = () => {
  // Sử dụng hook để lấy dữ liệu sản phẩm variants
 

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
              <Details/>
                {/* product details inner end */}
                {/* product details reviews start */}
                <div className="product-details-reviews section-padding pb-0">
                  <div className="row">
                    <div className="col-lg-12">
                      <ProductReview/>
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