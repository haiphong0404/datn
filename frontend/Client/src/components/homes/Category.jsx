import React from 'react';

const Category = () => {
  return (
    <section
      className="category-area bg-set bg-img section-padding pb-0"
      style={{
        backgroundImage: "url(/assets/img/bg/bg-listcate.jpg)",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center">
              <h3 className="title text-white">MUA SẮM THEO DANH MỤC THOR</h3>
              <h4 className="sub-title text-white">
              Sneaker của Thor là lựa chọn hoàn hảo cho phong cách trẻ trung, hiện đại.
              </h4>
            </div>
          </div>
        </div>
        <div className="row category-wrapper">
          {/* Danh mục 1 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="single-category-item">
              <div className="category-title">
                <a href="/shop">NAM</a>
              </div>
              <div className="category-thumb">
                <a href="/shop">
                  <img src="assets/img/category/category-1.png" alt="category thumb" />
                </a>
              </div>
              <div className="shop-collection text-center">
                <a className="shop-btn" href="/shop">
                  Bộ sưu tập cửa hàng
                </a>
              </div>
            </div>
          </div>
          
          {/* Danh mục 2 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="single-category-item">
              <div className="category-title">
                <a href="/shop">NỮ</a>
              </div>
              <div className="category-thumb">
                <a href="/shop">
                  <img src="assets/img/category/category-2.png" alt="category thumb" />
                </a>
              </div>
              <div className="shop-collection text-center">
                <a className="shop-btn" href="/shop">
                  Bộ sưu tập cửa hàng
                </a>
              </div>
            </div>
          </div>
          
          {/* Danh mục 3 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="single-category-item">
              <div className="category-title">
                <a href="/shop">NHANH CHÓNG</a>
              </div>
              <div className="category-thumb">
                <a href="/shop">
                  <img src="assets/img/category/category-3.png" alt="category thumb" />
                </a>
              </div>
              <div className="shop-collection text-center">
                <a className="shop-btn" href="/shop">
                  Bộ sưu tập cửa hàng
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
