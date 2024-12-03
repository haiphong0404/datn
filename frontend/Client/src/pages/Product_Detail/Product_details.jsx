

import React from 'react';
import { useQuery } from '@tanstack/react-query'
import Details from './Details';
import ProductReview from './ProductReview';
import { fetchProducts } from '../../api/product';
import { Link } from "react-router-dom";
const Product_details = () => {
  // Sử dụng hook để lấy dữ liệu sản phẩm variants
  const { data: products = [], error: productsError } = useQuery({
    queryKey: ['Products'],
    queryFn: fetchProducts,
  });

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
                  <h3 className="title"  style={{
                               
                                marginBottom: '80px',
                              
                              }}>SẢN PHẨM LIÊN QUAN</h3>
                  
                  <div className="product-list">
                    {products.slice(0, 4).map((product) => (
                      <div key={product.id} className="product-item">
                        <div className="product-thumb">
                          <Link to={`/product_details/${product.id}`}>
                            <img
                              src={product.image || '/path/to/placeholder.jpg'} // Đổ hình ảnh từ API
                              alt={product.name}
                              style={{
                                display: 'block',
                                margin: '0 auto',
                                width: '300px', // Đặt chiều rộng mong muốn
                                height: '200px', // Đặt chiều cao mong muốn
                                objectFit: 'cover', // Cắt ảnh để phù hợp với kích thước mà không bị méo
                              }}
                            />
                          </Link>

                        </div>
                        <div className="product-content">
                          <div className="product-caption">
                            <h6 className="product-name">
                              <Link to={`/product_details/${product.id}`}>{product.name}</Link> {/* Đổ tên sản phẩm */}
                            </h6>
                            <div className="price-box">
                              <span className="price-regular">
                                {product.price ? `${new Intl.NumberFormat('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(product.price)} Vnd` : "Liên hệ"}
                              </span>
                            </div>
                            <Link className="add-to-cart" onClick={() => handleQuickView(product)} >
                              <i className="fa fa-shopping-cart" />
                            </Link>                    </div>

                        </div>
                      </div>
                    ))}
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

    </div>

  );
};
export default Product_details;