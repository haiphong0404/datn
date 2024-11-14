import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const [localCart, setLocalCart] = useState([]); // Lưu trữ giỏ hàng
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải giỏ hàng
  const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền
  const [totalQuantity, setTotalQuantity] = useState(0); // Tổng số lượng
  const [selectedItems, setSelectedItems] = useState(new Set()); // Danh sách sản phẩm đã chọn để thanh toán

  useEffect(() => {
    const fetchCart = async () => {
      if (localStorage.getItem('token')) { // Nếu người dùng đã đăng nhập
        try {
          const response = await axios.get('/cart', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
  
          if (response.data && Array.isArray(response.data.carts)) {
            setLocalCart(response.data.carts);
            localStorage.setItem('cart', JSON.stringify(response.data.carts)); // Đồng bộ hóa với localStorage
          } else {
            setLocalCart([]);
          }
        } catch (error) {
          console.error("Error fetching cart data", error);
          setLocalCart([]);
        } finally {
          setIsLoading(false);
        }
      } else { // Nếu người dùng chưa đăng nhập
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          setLocalCart(JSON.parse(cartData)); // Lấy dữ liệu từ localStorage
        }
        setIsLoading(false);
      }
    };
  
    fetchCart();
  }, []);

  useEffect(() => {
    let calculatedPrice = 0;
    let calculatedQuantity = 0;

    localCart.forEach(variant => {
      if (selectedItems.has(variant.id_productVariant)) { // Sử dụng id_productVariant
        calculatedPrice += variant.price * variant.quantity;
        calculatedQuantity += variant.quantity;
      }
    });

    setTotalPrice(calculatedPrice);
    setTotalQuantity(calculatedQuantity);
  }, [selectedItems, localCart]);

  const handleCheckboxChange = (variantId) => {
    const updatedSelectedItems = new Set(selectedItems);
    if (updatedSelectedItems.has(variantId)) {
      updatedSelectedItems.delete(variantId); // Nếu sản phẩm đã được chọn, bỏ chọn
    } else {
      updatedSelectedItems.add(variantId); // Nếu sản phẩm chưa được chọn, chọn nó
    }
    setSelectedItems(updatedSelectedItems);
  };

  const handleRemoveFromCart = async (id_productVariant) => {
    console.log("id_productVariant:", id_productVariant); // Kiểm tra giá trị
    if (!id_productVariant) {
      console.error('Product variant ID is undefined!');
      return; // Dừng nếu ID không hợp lệ
    }
  
    const token = localStorage.getItem('token'); // Kiểm tra token
  
    if (token) {
      // Nếu có token, gửi yêu cầu với token để xóa sản phẩm trên server
      try {
        const response = await axios.delete(`/cart/remove/${id_productVariant}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          // Cập nhật lại giỏ hàng sau khi xóa sản phẩm từ cơ sở dữ liệu
          setLocalCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.id_productVariant !== id_productVariant);
            localStorage.setItem('cart', JSON.stringify(updatedCart)); // Đồng bộ hóa lại localStorage
            return updatedCart;
          });
          setSelectedItems(prevSelected => new Set([...prevSelected].filter(item => item !== id_productVariant)));
          toast('Sản phẩm đã được xóa khỏi giỏ hàng.');
          window.location.reload(); // Reload lại trang sau khi xóa thành công
        } else {
          toast('Không thể xóa sản phẩm. Vui lòng thử lại.');
        }
      } catch (error) {
        console.error('Error removing item from cart:', error);
        alert('Không thể xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại.');
      }
    } else {
      // Nếu không có token (chưa đăng nhập), chỉ xóa sản phẩm từ localStorage
      const cartData = localStorage.getItem('cart');
      if (!cartData) {
        console.log('Giỏ hàng trống hoặc không có dữ liệu trong localStorage');
        return;
      }
  
      const parsedCart = JSON.parse(cartData);
  
      // Lọc bỏ sản phẩm cần xóa
      const updatedCart = parsedCart.filter(item => item.id_productVariant !== id_productVariant);
  
      // Cập nhật lại giỏ hàng trong localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
  
      // Cập nhật lại trạng thái giỏ hàng trong React
      setLocalCart(updatedCart);
      setSelectedItems(prevSelected => new Set([...prevSelected].filter(item => item !== id_productVariant)));
  
      toast('Sản phẩm đã được xóa khỏi giỏ hàng.');
    }
  };
  
  
  

  const handleCheckout = () => {
    if (selectedItems.size > 0) {  // Sử dụng .size thay vì length
      console.log('Đang thanh toán cho sản phẩm:', [...selectedItems]);
    } else {
      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
    }
  };
  console.log("productId:");  // Kiểm tra giá trị productId


  return (
    <div className="cart-container">
      {isLoading ? (
        <p>Đang tải giỏ hàng...</p>
      ) : (
        <div className="cart-variants">
          {Array.isArray(localCart) && localCart.length > 0 ? (
            localCart.map((variant) => (
              <div key={variant.id_productVariant} className="cart-variant-card">
                <div className="variant-image">
                  <div className="checkbox-control">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.has(variant.id_productVariant)} // Sử dụng id_productVariant
                      onChange={() => handleCheckboxChange(variant.id_productVariant)} 
                    />
                  </div>
                  
                  <Link to={`/product_details/${variant.productId}`}>
                    <img
                      src={variant.image || '/default-image.jpg'}
                      alt={variant.name}
                      width={200}
                    />
                  </Link>
                </div>

                <div className="variant-info">
                  <Link to={`/product_details/${variant.productId}`}>
                  <h4 className="variant-name">{variant.name || variant.productName}</h4>

                  </Link>
                  <div className="variant-size-color">
                    <p className="variant-color">Màu: {variant.color || 'Không xác định'}</p>
                    <p className="variant-size">Size: {variant.size || 'Không xác định'}</p>
                  </div>
                </div>

                <div className="variant-quantity">
                  <div className="quantity-control">
                    <label>Số lượng:</label>
                    <span className="quantity-display">{variant.quantity}</span>
                  </div>
                  <p className="variant-price">Giá: {variant.price} VND</p>
                </div>

                <div className="variant-actions">
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveFromCart(variant.id_productVariant)} // Sử dụng id_productVariant
                  >
                    <i className="bi bi-trash"></i> Xóa
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Giỏ hàng của bạn hiện tại trống!</p>
          )}
        </div>
      )}

      <div className="col-lg-4">
        <div className="total-calculation">
          <h5>Tổng: {totalQuantity} sản phẩm</h5>
          <h5>Tổng tiền: {totalPrice} VND</h5>
          <button onClick={handleCheckout}>Thanh toán</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
