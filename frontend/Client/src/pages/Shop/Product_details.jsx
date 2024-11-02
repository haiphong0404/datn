

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProductvariants from '../../hooks/useProductVariants';
import { useDispatch, useSelector } from 'react-redux';
import add, { loadCartFromLocalStorage } from '../../actions/action';

const Product_details = () => {
  const cart = useSelector(state => state.updateCart)
  const [localCart, setLocalCart] = useState(cart);
  const dispatch = useDispatch()
  const handleAddToCart = (product) => {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
    const existingProduct = localCart.find(item => item.id === product.id);
    
    if (existingProduct) {
      // Nếu sản phẩm đã tồn tại và số lượng nhỏ hơn số lượng trong kho
      if (existingProduct.quantity < product.quantity) {
        existingProduct.quantity += 1;
        setLocalCart([...localCart]);
        localStorage.setItem("cart", JSON.stringify(localCart));
        dispatch(add(existingProduct));
      } else {
        alert("Đã đạt số lượng tối đa trong kho!");
      }
    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng
      product.quantity = 1; // Đặt số lượng ban đầu là 1
      const updatedCart = [...localCart, product];
      setLocalCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      dispatch(add(product));
    }
  };
  
  useEffect(() => {
    const savedCart = loadCartFromLocalStorage(); // Lấy giỏ hàng từ localStorage
    setLocalCart(savedCart);
  }, [cart]);
  // Sử dụng hook để lấy dữ liệu sản phẩm variants
  const { productId } = useParams();
  const { variants, isLoading, error } = useProductvariants(productId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching product details: {error.message}</div>;
  }
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
                        {variants.map((product) => (
                          <div className="pro-large-img img-zoom" key={product.id}>
                            <img
                              src={product.images.length > 0 ? product.images[0] : "assets/img/product/default.jpg"} // Hình ảnh đầu tiên của biến thể hoặc hình ảnh mặc định
                              alt="product-details"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="pro-nav">
                        {variants.map((product) => (
                          <div className="pro-nav-thumb" key={product.id}>
                            <img
                              src={product.images.length > 0 ? product.images[0] : "assets/img/product/default.jpg"} // Hình ảnh đầu tiên của biến thể hoặc hình ảnh mặc định
                              alt="product-details"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-7">
                      {variants.map((product) => (
                        <div className="product-details-des" key={product.id}>
                          <h3 className="product-name">
                            {product.size} {product.color} {/* Hiển thị tên biến thể */}
                          </h3>
                          <div className="price-box">
                            <span className="price-old">
                              {/* Giá cũ, ví dụ cộng thêm 20 */}
                            </span>
                            <span className="price-regular">${product.price}</span>
                          </div>
                          <h5 className="offer-text">
                            <strong>Hurry up</strong>! offer ends in:
                          </h5>
                          <div className="product-countdown" data-countdown="2021/09/20" />
                          <div className="availability">
                            <i className="fa fa-check-circle" />
                            <span>{product.quantity} in stock</span> {/* Hiển thị số lượng còn lại */}
                          </div>
                          <p className="pro-desc">
                            Lorem ipsum do {/* Mô tả sản phẩm, có thể thay đổi tùy ý */}
                          </p>
                          <div className="quantity-cart-box d-flex align-items-center">
                            <h6 className="option-title">qty:</h6>
                            <div className="quantity">
                              <div className="pro-qty">
                                <input type="text" defaultValue={1} />
                              </div>
                            </div>
                            <div className="action_link">
                              <button className="btn btn-cart2" onClick={() => handleAddToCart(product)}>
                                Add To Cart
                              </button>
                            </div>
                          </div>
                          <div className="useful-links">
                            <a href="#">
                              <i className="fa fa-refresh" />
                              compare
                            </a>
                            <a href="#">
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
                      ))}
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