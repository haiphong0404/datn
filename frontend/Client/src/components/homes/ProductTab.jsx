import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { fetchProducts } from '../../api/product';

const ProductTab = () => {
  const { data: products = [], error: productsError } = useQuery({
    queryKey: ['Products'],
    queryFn: fetchProducts,
  });
  return (
    <section className="product-tab-area section-padding">
          <div className="container">
            <div className="pos-special-products">
              <div className="row">
                <div className="col-lg-6 col-right">
                  <div className="deals-tab-wrapper">
                    <div className="deals-tab-area">
                      <div className="deals-nav-carousel">

                        {products.slice(0, 4).map((product) => (
                          <div key={product.id} className="product-item">
                            <div className="product-thumb">
                              <a href="product-details.html">
                                <img
                                  src={product.image || '/path/to/placeholder.jpg'} // Đổ hình ảnh từ API
                                  alt={product.name}
                                />
                              </a>


                            </div>

                          </div>
                        ))}


                      </div>
                    </div>
                    <div className="deals-content-wrapper">
                      <div className="deals-content-carousel">
                        {Array.isArray(products) && products.slice(0, 1).map((product) => (
                          <div key={product.id} className="deals-slide-item">
                            <div className="deals-content-item">
                              <h2 className="deals-title">
                                <a href="product-details.html">{product.name}</a>
                              </h2>
                              <p className="deals-desc">{product.description}</p>
                              <button className="shop-btn" onClick={() => handleAddToCart(product)}>Thêm vào Giỏ hàng</button>
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}

export default ProductTab