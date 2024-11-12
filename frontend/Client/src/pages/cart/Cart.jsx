import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loadCartFromLocalStorage, loadCartFromRedux, removeFromCart, updateCart } from '../../actions/action';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
  const dispatch = useDispatch();
  const [localCart, setLocalCart] = useState([]);
  const [variantDetails, setVariantDetails] = useState({}); // Lưu chi tiết từng biến thể
  const [totalPrice, setTotalPrice] = useState(0); // Lưu tổng tiền
  const [totalQuantity, setTotalQuantity] = useState(0); // Lưu tổng số lượng
  const [selectedItems, setSelectedItems] = useState(new Set()); // Lưu các sản phẩm được chọn

  // Lấy giỏ hàng từ localStorage khi component mount
  useEffect(() => {
    const savedCart = loadCartFromLocalStorage();
    setLocalCart(savedCart);
  }, []);

  // Lấy chi tiết từng biến thể từ API
  useEffect(() => {
    const fetchVariantDetails = async () => {
      const details = {}; // Đối tượng lưu trữ thông tin chi tiết của các biến thể
      let calculatedPrice = 0;
      let calculatedQuantity = 0;

      for (const variant of localCart) {
        try {
          // Gửi request để lấy thông tin biến thể từ API
          const response = await axios.get(`/variants/${variant.id}`);
          details[variant.id] = response.data; // Lưu dữ liệu trả về vào đối tượng details

          // Cập nhật tổng giá trị và số lượng
          calculatedPrice += response.data.price * variant.quantity;
          calculatedQuantity += variant.quantity;
        } catch (error) {
          console.error(`Failed to fetch details for variant ${variant.id}`, error); // Ghi lại lỗi nếu có
        }
      }

      setVariantDetails(details); // Cập nhật thông tin chi tiết biến thể
      setTotalPrice(calculatedPrice); // Cập nhật tổng giá trị
      setTotalQuantity(calculatedQuantity); // Cập nhật tổng số lượng
    };

    if (localCart.length > 0) {
      fetchVariantDetails();
    }
  }, [localCart]);

  // Hàm để cập nhật số lượng sản phẩm
  const handleQuantityChange = (variantId, change) => {
    const updatedCart = localCart.map(item =>
      item.id === variantId ? { ...item, quantity: item.quantity + change } : item
    );

    // Chỉ cập nhật số lượng nếu giá trị còn trong khoảng hợp lệ
    setLocalCart(updatedCart);
    loadCartFromLocalStorage(updatedCart);
  };

  // Hàm để xử lý sự kiện checkbox
  const handleCheckboxChange = (variantId) => {
    const updatedSelectedItems = new Set(selectedItems);
    if (updatedSelectedItems.has(variantId)) {
      updatedSelectedItems.delete(variantId); // Nếu sản phẩm đã được chọn, bỏ chọn
    } else {
      updatedSelectedItems.add(variantId); // Nếu sản phẩm chưa được chọn, chọn nó
    }
    setSelectedItems(updatedSelectedItems);
  };

  // Tính tổng tiền và tổng số lượng cho các sản phẩm đã chọn
  useEffect(() => {
    let calculatedPrice = 0;
    let calculatedQuantity = 0;

    localCart.forEach(variant => {
      if (selectedItems.has(variant.id)) {
        calculatedPrice += variantDetails[variant.id]?.price * variant.quantity;
        calculatedQuantity += variant.quantity;
      }
    });

    setTotalPrice(calculatedPrice);
    setTotalQuantity(calculatedQuantity);
  }, [selectedItems, localCart, variantDetails]);

  const handleRemoveFromCart = async (variantId) => {
    try {
      const response = await axios.delete(`/cart/remove/${variantId}`);
      
      if (response.data.status === 'success') {
        // Cập nhật giỏ hàng sau khi xóa thành công
        const updatedCart = localCart.filter(item => item.id !== variantId);
        setLocalCart(updatedCart);
        loadCartFromLocalStorage(updatedCart);
        toast.success('Product removed successfully!');
      } else {
        toast.error('Failed to remove product.');
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
      toast.error('Failed to remove product.');
    }
  };
  return (
    <div className="cart-container">
      <div className="cart-variants">
        {localCart.map((variant) => (
          <div key={variant.id} className="cart-variant-card">
            <div className="variant-image">
            <div className="checkbox-control">
                <input 
                  type="checkbox" 
                  checked={selectedItems.has(variant.id)} 
                  onChange={() => handleCheckboxChange(variant.id)} 
                />
              </div>
              <Link to={`/product_details/${variant.productId}`}>
                {/* Kiểm tra và hiển thị ảnh, sử dụng fallback nếu không có dữ liệu */}
                <img 
                  src={variantDetails[variant.id]?.images[0] || '/default-image.jpg'} // Nếu không có ảnh, dùng ảnh mặc định
                  alt={variantDetails[variant.id]?.product.name || 'Product'} 
                  width={200} 
                />
              </Link>
            </div>

            <div className="variant-info">
              <Link to={`/product_details/${variant.productId}`}>
                <h4 className="variant-name">{variantDetails[variant.id]?.product.name || 'Product Name'}</h4>
              </Link>
              <div className="variant-size-color">
                <p className="variant-color">Màu: {variantDetails[variant.id]?.color || 'Đang tải...'}</p>
                <p className="variant-size">Size: {variantDetails[variant.id]?.size || 'Đang tải...'}</p>
                
              </div>
            </div>

            {/* Thêm checkbox để chọn sản phẩm */}
            <div className="variant-quantity">
              <label>Số lượng:</label>
              <div className="quantity-control">
                <button 
                  className="quantity-btn" 
                  onClick={() => handleQuantityChange(variant.id, -1)} 
                  disabled={variant.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-display">{variant.quantity}</span>
                <button 
                  className="quantity-btn" 
                  onClick={() => handleQuantityChange(variant.id, 1)}
                >
                  +
                </button>
                
              </div>
              <p className="variant-price">Giá: {variantDetails[variant.id]?.price} VND</p>
            </div>
            <div className="variant-actions">
              <button 
                className="remove-button" 
                onClick={() => handleRemoveFromCart(variant.id)}
              >
               <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="col-lg-4">
        <div className="total-calculation-wrapper">
          <div className="total-items-summary">
            <h6>Tổng Số Tiền</h6>
            <p>{totalPrice} VND</p> {/* Hiển thị tổng tiền của sản phẩm được chọn */}
            <p>Tổng Số Lượng: {totalQuantity}</p> {/* Hiển thị tổng số lượng */}
            <button className="checkout-button d-block" onClick={() => toast("Proceed to checkout!")}>
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
