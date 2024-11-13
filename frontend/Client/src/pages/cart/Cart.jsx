import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadCartFromLocalStorage, removeFromCart } from '../../actions/action';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const Cart = () => {
  const dispatch = useDispatch();
  const [localCart, setLocalCart] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]); // Danh sách biến thể được chọn

  useEffect(() => {
    const savedCart = loadCartFromLocalStorage();
    setLocalCart(savedCart);
  }, []);

  const handleRemoveFromCart = (id) => {
    const updatedCart = localCart.filter(variant => variant.id !== id);
    setLocalCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(removeFromCart(id));

    // Loại bỏ biến thể khỏi danh sách selectedVariants nếu nó đã được chọn
    const updatedSelectedVariants = selectedVariants.filter(variant => variant.id !== id);
    setSelectedVariants(updatedSelectedVariants);
  };


  const calculateTotalSelected = () => {
    return selectedVariants.reduce((total, item) => {
      return total + item.price * item.quantity; // Tính tổng giá cho từng sản phẩm được chọn
    }, 0);
  };


  const handleQuantityChange = (id, newQuantity) => {
    const variant = localCart.find(variant => variant.id === id);
  
    if (!variant) return; // Nếu không tìm thấy biến thể, không làm gì cả
  
    // Kiểm tra xem số lượng mới có vượt quá số lượng tồn kho không
    if (newQuantity > variant.stock) { // Thay variant.stock bằng thuộc tính mà bạn dùng để xác định số lượng tối đa
      toast.error("Số lượng vượt quá số lượng tối đa trong kho!");
      return; // Ngăn không cho cập nhật số lượng nếu vượt quá
    }
  
    if (newQuantity <= 0) return; // Ngăn không cho số lượng nhỏ hơn hoặc bằng 0
  
    const updatedCart = localCart.map((variant) =>
      variant.id === id ? { ...variant, quantity: newQuantity } : variant
    );
  
    setLocalCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    // Cập nhật quantity cho sản phẩm đang chọn
    const updatedSelectedVariants = selectedVariants.map((variant) =>
      variant.id === id ? { ...variant, quantity: newQuantity } : variant
    );
  
    setSelectedVariants(updatedSelectedVariants);
  };
  
  
  


  const handleCheckboxChange = (variant) => {
    const isSelected = selectedVariants.some((item) => item.id === variant.id);
    if (isSelected) {
      // Bỏ chọn biến thể nếu nó đã được chọn
      setSelectedVariants(selectedVariants.filter((item) => item.id !== variant.id));
    } else {
      // Chọn biến thể nếu nó chưa được chọn
      setSelectedVariants([...selectedVariants, variant]);
    }
  };

  return (
    <div>
      <div
          className="breadcrumb-area breadcrumb-img bg-img"
          style={{
            backgroundImage: "url(/assets/img/banner/shop.jpg)",
          }}
        ></div>
      <main>
        <div className="cart-main-wrapper section-padding">
          <div className="container">
            <div className="section-bg-color">
              <div className="row">
                <div className="col-lg-8">
                  <div className="cart-variants">
                    {localCart.map((variant) => (
                      <div key={variant.id} className="cart-variant-card">
                        <input
                          type="checkbox"
                          checked={selectedVariants.some((item) => item.id === variant.id)}
                          onChange={() => handleCheckboxChange(variant)} // Thay đổi khi nhấn checkbox
                        />
                        <div className="variant-image">
                          <Link to={`/product_details/${variant.productId}`}>
                            <img src={variant.image} alt={variant.name} width={200} />
                          </Link>
                        </div>
                        <div className="variant-info">
                        <Link to={`/product_details/${variant.productId}`}>
                          <h4 className="variant-name">{variant.productName}</h4>
                          </Link>
                          <p className="variant-size">Size: {variant.size}</p>
                          <p className="variant-color">Màu: {variant.color}</p>
                          <p className="variant-price">Giá: {variant.price} Vnd</p>
                          <div className="variant-quantity">
                            <button onClick={() => handleQuantityChange(variant.id, variant.quantity - 1)}>
                              -
                            </button>
                            <span>{variant.quantity}</span>
                            <button onClick={() => handleQuantityChange(variant.id, variant.quantity + 1)}>
                              +
                            </button>
                          </div>
                        </div>
                        <button className="remove-button" onClick={() => handleRemoveFromCart(variant.id)}>
                          <i className="fa fa-trash-o" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="cart-calculator-wrapper">
                    <div className="cart-calculate-items">
                      <h6>Tổng Số Tiền</h6>
                      <p>
                        {calculateTotalSelected()} Vnd {/* Hiển thị tổng tiền của sản phẩm được chọn */}
                      </p>
                      <button className="btn btn-sqr d-block" onClick={() => toast("Proceed to checkout!")}>
                       Thanh toán
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
