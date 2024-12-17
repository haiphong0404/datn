

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import Details from './Details';
import ProductReview from './ProductReview';
import { fetchProducts } from '../../api/product';
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import useProductSlider from '../../hooks/useProductSlider';
import QuickViewModal from "../../components/quickview/QuickView";
const Product_details = () => {
  // Sử dụng hook để lấy dữ liệu sản phẩm variants
  const { data: products = [], error: productsError } = useQuery({
    queryKey: ['Products'],
    queryFn: fetchProducts,
  });
  const { settings,settingsResponsive } = useProductSlider();
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleQuickView = (product) => {
    console.log('QuickView triggered for:', product); // Kiểm tra xem sản phẩm đã được truyền đúng chưa
    setSelectedProduct(product);
    setShowQuickView(true);
  };

  const handleCloseQuickView = () => {
    setShowQuickView(false);
  };

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
                    <h3 className="breadcrumb-title">Cửa hàng</h3>
                    <ul className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <a href="/">
                          <i className="fa fa-home" />
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="/shopshop">Cửa hàng</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Chi tiết sản phẩm
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
                <Details />
                {/* product details inner end */}
                {/* product details reviews start */}
                <div className="product-details-reviews section-padding pb-0">
                  <div className="row">
                    <div className="col-lg-12">
                      <ProductReview />
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
                  <h3 className="title" style={{

                    marginBottom: '80px',

                  }}>SẢN PHẨM LIÊN QUAN</h3>

                  <div className="slider-container custom-wrap" >
                    <Slider
                      {...settingsResponsive}
                      className="responsive-slider"
                    >
                     
                      {products.map((product) => (
                        <div className="prorelate">
                        <div key={product.id} className="product-item" style={{marginLeft: '5px', marginRight: '5px', }} >
                          <div className="product-thumb">
                            <img
                              src={product.image || '/path/to/placeholder.jpg'}
                              alt={product.name}
                              style={{
                                display: 'block',
                                margin: '0 auto',
                                width: '90%', // Đặt chiều rộng động để hình ảnh co giãn
                                height: '180px',
                                objectFit: 'cover',
                              }}
                            />
                          </div>
                          <div className="product-content" style={{ height:'150px' }}>
                            <div className="product-caption">
                              <h6 className="product-name">
                                <Link to={`/product_details/${product.id}`}>{product.name}</Link>
                              </h6>
                              <div className="price-box">
                                <span className="price-regular">
                                  {product.price
                                    ? `${new Intl.NumberFormat('vi-VN', {
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    }).format(product.price)} VND`
                                    : 'Liên hệ'}
                                </span>
                              </div>
                              <Link
                                className="add-to-cart"
                                onClick={(event) => {
                                  event.preventDefault();
                                  handleQuickView(product);
                                }}
                              >
                                <i className="fa fa-shopping-cart" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        </div>
                      ))}
                    
                    </Slider>


                  </div>

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
      {selectedProduct && (
        <QuickViewModal
          show={showQuickView}
          onClose={handleCloseQuickView}
          product={selectedProduct}
        />
      )}
    </div>

  );
};
export default Product_details;