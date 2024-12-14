import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../contexts/CartContext.js';
const Cart = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const { localCart, handleRemoveFromCart, setLocalCart, addToCart } = useCart();




  // Fetch giỏ hàng từ server hoặc localStorage
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/cart', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { carts } = response.data; // Lấy danh sách carts từ API
          if (Array.isArray(carts)) {
            setLocalCart(carts);
            localStorage.removeItem('cart');

          } else {
            setLocalCart([]);
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
          setLocalCart([]);
        }
      } else {
        // Lấy từ localStorage nếu không có token
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          setLocalCart(JSON.parse(cartData));
        } else {
          setLocalCart([]);
        }
      }
      setIsLoading(false);
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





  const handleCheckout = async () => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa (ví dụ kiểm tra token trong localStorage)
    const isLoggedIn = localStorage.getItem('token'); // Kiểm tra sự tồn tại của token trong localStorage

    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, thông báo và chuyển hướng đến trang đăng nhập
      toast.error('Vui lòng đăng nhập để thanh toán!');
      navigate('/login');  // Chuyển hướng đến trang đăng nhập
      return;
    }

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
      if (totalPrice > 20000000) {
        navigate('/contact_us')
        toast.error('Giá trị đơn hàng vượt quá 20,000,000 VND. Bạn cần liên hệ với admin để đặt hàng.');
        return; // Dừng quá trình thanh toán
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

        // Kiểm tra xem số lượng có vượt quá số lượng trong kho hay không
        if (newQuantity > item.stock) {
          toast.warn('Số lượng trong kho không đủ!');
          return item; // Giữ nguyên số lượng hiện tại nếu vượt quá kho
        }

        // Kiểm tra nếu số lượng mới là hợp lệ (phải lớn hơn 0)
        if (newQuantity <= 0) {
          toast.warn('Số lượng không thể nhỏ hơn 1!');
          return item; // Giữ nguyên số lượng hiện tại nếu không hợp lệ
        }

        // Cập nhật số lượng hợp lệ
        return { ...item, quantity: newQuantity };
      }
      return item; // Giữ nguyên các sản phẩm khác
    });

    setLocalCart(updatedCart);
    const isLoggedIn = Boolean(localStorage.getItem('token')); // Ví dụ kiểm tra có token đăng nhập

    if (isLoggedIn) {
      // Người dùng đã đăng nhập: Lưu tối ưu
      const optimizedCart = updatedCart.map(item => ({
        id_productVariant: item.id_productVariant,
        quantity: item.quantity,
      }));
      localStorage.setItem('cart', JSON.stringify(optimizedCart));
    } else {
      // Người dùng chưa đăng nhập: Lưu đầy đủ
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };




  return (
    <main >
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
                  <h3 className="breadcrumb-title">Giỏ Hàng</h3>
                  <ul className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item">
                      <a href="/">
                        <i className="fa fa-home" />
                      </a>
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
      <div className="cart-container">
        {isLoading ? (
          <p>Đang tải giỏ hàng...</p>
        ) : (
          <div className="cart-variants">
            {Array.isArray(localCart) && localCart.length > 0 ? (
              localCart.map((variant) => (
                <div key={variant.id_productVariant} className="cart-variant-card">
                  <div className="checkbox-control">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(variant.id_productVariant)}
                      onChange={() => handleCheckboxChange(variant.id_productVariant)}
                    // disabled={variant.outOfStockMessage !== null} // Vô hiệu hóa checkbox nếu hết hàng
                    />
                  </div>
                  <div className="variant-image">

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
                    <p className="variant-price">Giá: {variant.price
                      ? `${new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(variant.price)}`
                      : 'Liên hệ'} </p>
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
          <h5>Tổng tiền: {totalPrice
            ? `${new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(totalPrice)}`
            : '0 ₫'} </h5>
          <button onClick={handleCheckout}>Thanh toán</button>
        </div>
      </div>
    </main>
  );
};

export default Cart;