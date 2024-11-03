import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadCartFromLocalStorage, removeFromCart } from '../../actions/action';
import axios from 'axios';

const Cart = () => {
  const dispatch = useDispatch();
  const [localCart, setLocalCart] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]); // Danh sách sản phẩm được chọn

  useEffect(() => {
    const savedCart = loadCartFromLocalStorage();
    setLocalCart(savedCart);
  }, []);

  const handleRemoveFromCart = (id) => {
    const updatedCart = localCart.filter(product => product.id !== id);
    setLocalCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(removeFromCart(id));
  };

  const calculateTotalSelected = () => {
    return selectedProducts.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) return;
    const updatedCart = localCart.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );
    setLocalCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Cập nhật quantity cho sản phẩm đang chọn (nếu có trong danh sách selectedProducts)
    const updatedSelectedProducts = selectedProducts.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );
    setSelectedProducts(updatedSelectedProducts);
  };

  const handleCheckboxChange = (product) => {
    const isSelected = selectedProducts.some((item) => item.id === product.id);
    if (isSelected) {
      // Bỏ chọn sản phẩm nếu nó đã được chọn
      setSelectedProducts(selectedProducts.filter((item) => item.id !== product.id));
    } else {
      // Chọn sản phẩm nếu nó chưa được chọn
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  return (
    <div>
      <main>
        <div className="cart-main-wrapper section-padding">
          <div className="container">
            <div className="section-bg-color">
              <div className="row">
                <div className="col-lg-8">
                  <div className="cart-products">
                    {localCart.map((product) => (
                      <div key={product.id} className="cart-product-card">
                        <input
                          type="checkbox"
                          checked={selectedProducts.some((item) => item.id === product.id)}
                          onChange={() => handleCheckboxChange(product)} // Thay đổi khi nhấn checkbox
                        />
                        <div className="product-image">
                          <img src={product.image} alt={product.name} width={50} />
                        </div>
                        <div className="product-info">
                          <h4 className="product-name">{product.name}</h4>
                          <p className="product-size">Size: {product.size}</p>
                          <p className="product-color">Màu: {product.color}</p>
                          <p className="product-price">Giá: ${product.price}</p>
                          <div className="product-quantity">
                            <button onClick={() => handleQuantityChange(product.id, product.quantity - 1)}>
                              -
                            </button>
                            <span>{product.quantity}</span>
                            <button onClick={() => handleQuantityChange(product.id, product.quantity + 1)}>
                              +
                            </button>
                          </div>
                        </div>
                        <button className="remove-button" onClick={() => handleRemoveFromCart(product.id)}>
                          <i className="fa fa-trash-o" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="cart-calculator-wrapper">
                    <div className="cart-calculate-items">
                      <h6>Total for Selected Products</h6>
                      <p>
                        ${calculateTotalSelected().toFixed(2)} {/* Hiển thị tổng tiền của sản phẩm được chọn */}
                      </p>
                      <button className="btn btn-sqr d-block" onClick={() => alert("Proceed to checkout!")}>
                        Proceed Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
