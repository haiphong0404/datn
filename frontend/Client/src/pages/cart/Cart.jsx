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
  const handleCheckboxChange = (variantId) => {
    const updatedSelectedItems = new Set(selectedItems);
    if (updatedSelectedItems.has(variantId)) {
      updatedSelectedItems.delete(variantId);
    } else {
      updatedSelectedItems.add(variantId);
    }
    setSelectedItems(updatedSelectedItems);
  };

  // Xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = async (id_productVariant) => {
    console.log("id_productVariant:", id_productVariant);
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
            return updatedCart;
          });
          setSelectedItems(prevSelected => new Set([...prevSelected].filter(item => item !== id_productVariant)));
          toast('Sản phẩm đã được xóa khỏi giỏ hàng.');
          window.location.reload();
        }
      } catch (error) {
        console.error('Error removing item from cart:', error);
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
  const handleCheckout = () => {
    const selectedProducts = getSelectedProducts();
  
    if (selectedProducts.length > 0) {
      // Kiểm tra sản phẩm hết hàng
      const outOfStockProducts = selectedProducts.filter(
        (product) => product.stock === 0
      );
  
      if (outOfStockProducts.length > 0) {
        const productNames = outOfStockProducts.map((p) => p.name).join(', ');
        toast.error(`Sản phẩm sau đã hết hàng: ${productNames}`);
        return; // Ngăn điều hướng nếu có sản phẩm hết hàng
      }
  
      // Nếu tất cả sản phẩm đều còn hàng, lưu vào localStorage và chuyển sang trang thanh toán
      console.log('Đang thanh toán cho các sản phẩm:', selectedProducts);
      localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
      selectedProducts.forEach((product) => {
        console.log(product.name); // "Giày Nike Air Force 1 ’07"
        console.log(product.color); // "Spinka, Lemke and Corkery"
        console.log(product.id_productVariant); // 104
        console.log(product.quantity); // 2
      });
      navigate('/checkout');
    } else {
      toast.warn('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
    }
  };
  
  const handleQuantityChange = async (variantId, change) => {
    const updatedCart = localCart.map(item => {
      if (item.id_productVariant === variantId) {
        const newQuantity = item.quantity + change;
        
        // Debug logs để kiểm tra giá trị
        console.log(`Current quantity: ${item.quantity}, Stock: ${item.stock}, New quantity: ${newQuantity}`);
  
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
    </main>
  );
};

export default Cart;