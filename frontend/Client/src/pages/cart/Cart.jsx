import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCartFromLocalStorage, removeFromCart } from '../../actions/action';
import axios from 'axios';

const Cart = () => {
  const dispatch = useDispatch()
//   const { cart } = useSelector(state => state.updateCart)
// console.log(cart);

const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    const savedCart = loadCartFromLocalStorage(); // Lấy giỏ hàng từ localStorage
    setLocalCart(savedCart); // Lưu vào state
    console.log(savedCart); // In ra để kiểm tra
  }, []); // Chỉ chạy một lần khi component được mount

  const handleRemoveFromCart = (id) => {
    const updatedCart = localCart.filter(product => product.id !== id);
    setLocalCart(updatedCart); // Cập nhật local state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Cập nhật localStorage
  
    // Cập nhật Redux store
    dispatch(removeFromCart(id)); // Giả sử bạn có một action để xóa sản phẩm khỏi Redux store
  };
  
  const calculateTotal = () => {
    return localCart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const submitCartToBackend = async () => {
    try {
      const response = await axios.post('/cart/add', { cart: localCart });
      console.log("Cart submitted successfully:", response.data);
      alert("Cart submitted successfully!");
    } catch (error) {
      console.error("Error submitting cart:", error);
      alert("Failed to submit cart.");
    }
  };
  console.log(localCart);
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) return;
    const updatedCart = localCart.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );
    setLocalCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
                        Cart
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* breadcrumb area end */}
        {/* cart main wrapper start */}
        <div className="cart-main-wrapper section-padding">
          <div className="container">
            <div className="section-bg-color">
              <div className="row">
                <div className="col-lg-12">
                  {/* Cart Table Area */}
                  <div className="cart-table table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="pro-thumbnail">Hình ảnh</th>
                            <th className="pro-title">Tên</th>
                            <th className="pro-title">Size</th>
                            <th className="pro-title">Màu</th>
                            <th className="pro-price">Giá</th>
                            <th className="pro-quantity">Số lượng</th>
                            <th className="pro-subtotal">tổng</th>
                            <th className="pro-remove">xóa</th>
                          </tr>
                        </thead>
                        <tbody>
                          {localCart.map((product) => (
                            <tr key={product.id}>
                              <td className="pro-thumbnail">
                                <a href="#">
                                  <img
                                    className="img-fluid"
                                    src={product.image}
                                    alt={product.name}
                                    width={50}
                                  />
                                </a>
                              </td>
                              <td className="pro-title">
                                <a href="#">{product.name}</a>
                              </td>
                              <td className="pro-title">
                                <a href="#">{product.size}</a>
                              </td>
                              <td className="pro-title">
                                <a href="#">{product.color}</a>
                              </td>
                              <td className="pro-price">
                                <span>{product.price}</span>
                              </td>
                              <td className="pro-quantity">
                                <div className="pro-qty">
                                  <button onClick={() => handleQuantityChange(product.id, product.quantity - 1)}>
                                    -
                                  </button>
                                  {product.quantity}
                                  <button onClick={() => handleQuantityChange(product.id, product.quantity + 1)}>
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="pro-subtotal">
                                <span>${(product.price * product.quantity).toFixed(2)}</span>
                              </td>
                              <td className="pro-remove">
                                <button  onClick={() => handleRemoveFromCart(product.id)}>
                                  <i className="fa fa-trash-o" />
                                </button>
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="4" className="text-right"><strong>Total:</strong></td>
                            <td colSpan="2">
                              <span>${calculateTotal().toFixed(2)}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  {/* Cart Update Option */}
                  <div className="cart-update-option d-block d-md-flex justify-content-between">
                    <div className="apply-coupon-wrapper">
                      <form action="#" method="post" className=" d-block d-md-flex">
                        <input
                          type="text"
                          placeholder="Enter Your Coupon Code"
                          required=""
                        />
                        <button className="btn btn-sqr">Apply Coupon</button>
                      </form>
                    </div>
                    <div className="cart-update">
                      <a href="#" className="btn btn-sqr">
                        Update Cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 ms-auto">
                  {/* Cart Calculation Area */}
                  <div className="cart-calculator-wrapper">
                  <div className="cart-calculate-items">
                        <h6>Cart Totals</h6>
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td>Sub Total</td>
                                <td>${calculateTotal().toFixed(2)}</td> {/* Tổng phụ tính toán */}
                              </tr>
                              <tr>
                                <td>Shipping</td>
                                <td>$30</td> {/* Bạn có thể thay đổi giá trị này nếu cần */}
                              </tr>
                              <tr className="total">
                                <td>Total</td>
                                <td className="total-amount">${(calculateTotal() + 30).toFixed(2)}</td> {/* Tổng tính toán với phí vận chuyển */}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <button
                      
                      className="btn btn-sqr d-block"
                      onClick={submitCartToBackend}
                    >
                      Proceed Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* cart main wrapper end */}
      </main>

    </div>

  );
};
export default Cart;