import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const [localCart, setLocalCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [selectedItems, setSelectedItems] = useState(new Set());




  // Fetch giỏ hàng từ server hoặc localStorage
  useEffect(() => {
    const fetchCart = async () => {
      if (localStorage.getItem('token')) {
        // Nếu đã đăng nhập, lấy giỏ hàng từ server
        try {
          const response = await axios.get('/cart', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });

          if (response.data && Array.isArray(response.data.carts)) {
            // Cập nhật giỏ hàng từ server vào localStorage
            setLocalCart(response.data.carts);
            localStorage.setItem('cart', JSON.stringify(response.data.carts));
          } else {
            setLocalCart([]); // Nếu không có giỏ hàng từ server, khởi tạo giỏ hàng trống
          }
        } catch (error) {
       
          setLocalCart([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Nếu chưa đăng nhập, lấy giỏ hàng từ localStorage
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          setLocalCart(JSON.parse(cartData));
        }
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);


  // Tính tổng tiền và số lượng dựa trên các sản phẩm đã chọn
  useEffect(() => {
    let calculatedPrice = 0;
    let calculatedQuantity = 0;

    localCart.forEach(variant => {
      if (selectedItems.has(variant.id_productVariant)) {
        calculatedPrice += variant.price * variant.quantity;
        calculatedQuantity += variant.quantity;
      }
    });

    setTotalPrice(calculatedPrice);
    setTotalQuantity(calculatedQuantity);
  }, [selectedItems, localCart]);

  // Lấy danh sách sản phẩm đã chọn
  const getSelectedProducts = () => {
    return localCart.filter(item => selectedItems.has(item.id_productVariant));
  };

  // Xử lý khi chọn sản phẩm
  const handleCheckboxChange = (variant) => {
    const updatedSelectedItems = new Set(selectedItems);
    
    // Kiểm tra xem sản phẩm đã được chọn chưa
    if (updatedSelectedItems.has(variant)) {
      updatedSelectedItems.delete(variant);  // Nếu đã chọn thì xóa khỏi Set
    } else {
      updatedSelectedItems.add(variant);  // Nếu chưa chọn thì thêm sản phẩm vào Set
    }
  
    // Cập nhật lại trạng thái selectedItems
    setSelectedItems(updatedSelectedItems);
  };

  // Xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = async (id_productVariant) => {
    
    if (!id_productVariant) return;

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.delete(`/cart/remove/${id_productVariant}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setLocalCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.id_productVariant !== id_productVariant);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
          });
          setSelectedItems(prevSelected => new Set([...prevSelected].filter(item => item !== id_productVariant)));
          toast('Sản phẩm đã được xóa khỏi giỏ hàng.');
          window.location.reload();
        }
      } catch (error) {
    
        toast.error('Không thể xóa sản phẩm khỏi giỏ hàng.');
      }
    } else {
      const cartData = localStorage.getItem('cart');
      if (!cartData) return;
      const parsedCart = JSON.parse(cartData);
      const updatedCart = parsedCart.filter(item => item.id_productVariant !== id_productVariant);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setLocalCart(updatedCart);
      setSelectedItems(prevSelected => new Set([...prevSelected].filter(item => item !== id_productVariant)));
      toast('Sản phẩm đã được xóa khỏi giỏ hàng.');
      window.location.reload();
    }
  };

  // Xử lý thanh toán
  const handleCheckout = async () => {
    if (selectedItems.size > 0) { // Kiểm tra xem có sản phẩm được chọn hay không
      
  
      // Lưu selectedItems vào localStorage
      localStorage.setItem('selectedItems', JSON.stringify([...selectedItems]));
      const selectedProducts = getSelectedProducts();
      // Mảng để theo dõi các sản phẩm hết hàng
      const outOfStockItems = [];
      let allInStock = true; // Flag kiểm tra tất cả sản phẩm có đủ số lượng hay không
  
      // Duyệt qua selectedItems để kiểm tra từng sản phẩm trong localCart
      for (const variantId of selectedItems) {  // Đảm bảo dùng variantId trong selectedItems
        try {
          // Tìm variant trong localCart dựa trên variantId
          const variant = localCart.find(v => v.id_productVariant === variantId);
  
          if (variant) {
            const quantityRequested = variant.quantity; // Số lượng cần kiểm tra
            // Gửi API call để kiểm tra số lượng tồn kho
            const response = await axios.post('http://127.0.0.1:8000/api/product-variants/check-quantity', [
              {
                product_variant_id: variant.id_productVariant,
                quantity: quantityRequested,
              },
            ]);
  
            const data = response.data;
  
            if (!data.success) {
              // Nếu sản phẩm hết hàng, thêm vào mảng outOfStockItems và đánh dấu flag
              outOfStockItems.push(variant);
              allInStock = false;  // Nếu có sản phẩm hết hàng, đánh dấu là không đủ số lượng
            }
          }
  
        } catch (error) {
          
          
          // Nếu có lỗi, cần kiểm tra lỗi và thêm variant vào outOfStockItems
          const variant = localCart.find(v => v.id_productVariant === variantId); // Đảm bảo variant được định nghĩa
          if (variant) {
            outOfStockItems.push(variant); // Thêm variant vào danh sách hết hàng nếu có lỗi
          }
          allInStock = false; // Đánh dấu là không đủ số lượng nếu có lỗi
        }
      }
  
      // Kiểm tra nếu có sản phẩm hết hàng
      if (outOfStockItems.length > 0) {
        const outOfStockMessages = outOfStockItems.map((item) => {
          return `Sản phẩm: ${item.name} (Kích thước: ${item.size}, Màu sắc: ${item.color}) đã hết.`;
        });
        toast.error(`\n${outOfStockMessages.join('\n')}`);
      }
  
      // Chỉ chuyển đến trang checkout nếu tất cả sản phẩm đều đủ số lượng
      if (allInStock) {
        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
        navigate('/checkout');
      } 
    } else {
      toast.error('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
    }
  };
  
  
  const handleQuantityChange = async (variantId, change) => {
    const updatedCart = localCart.map(item => {
      if (item.id_productVariant === variantId) {
        const newQuantity = item.quantity + change;

        // Debug logs để kiểm tra giá trị
       

        // Kiểm tra xem số lượng có vượt quá số lượng trong kho hay không
        if (newQuantity > item.stock) {
          toast.warn('Số lượng trong kho không đủ!');
          return item;  // Nếu số lượng vượt quá kho, giữ nguyên số lượng hiện tại
        }

        // Kiểm tra nếu số lượng mới là hợp lệ (phải lớn hơn 0)
        if (newQuantity <= 0) {
          toast.warn('Số lượng không thể nhỏ hơn 1!');
          return item;  // Nếu số lượng nhỏ hơn hoặc bằng 0, giữ nguyên số lượng hiện tại
        }

        // Cập nhật số lượng hợp lệ
        return { ...item, quantity: newQuantity };
      }
      return item;  // Nếu không phải sản phẩm đang sửa đổi, giữ nguyên
    });

    setLocalCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };



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
                      checked={selectedItems.has(variant.id_productVariant)}
                      onChange={() => handleCheckboxChange(variant.id_productVariant)}
                    />
                  </div>
                  <Link to={`/product_details/${variant.productId}`}>
                    <img src={variant.image || '/default-image.jpg'} alt={variant.name} width={100} />
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

                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(variant.id_productVariant, -1)} // Giảm số lượng
                    >
                      -
                    </button>
                    <span className="quantity-display">{variant.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(variant.id_productVariant, 1)} // Tăng số lượng
                    >
                      +
                    </button>
                  </div>
                  <p className="variant-price">Giá: {variant.price} VND</p>
                </div>

                <div className="variant-actions">
                  <button className="remove-button" onClick={() => handleRemoveFromCart(variant.id_productVariant)}>
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

      <div className="total-calculation">
        <h5>Tổng: {totalQuantity} sản phẩm</h5>
        <h5>Tổng tiền: {totalPrice} VND</h5>
        <button onClick={handleCheckout}>Thanh toán</button>
      </div>
    </div>
  );
};

export default Cart;