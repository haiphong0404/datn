import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const [localCart, setLocalCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Fetch cart data from the server or localStorage
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
          console.error('Error fetching cart data', error);
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
  

  // Calculate total price and quantity based on selected items using useMemo
  const { totalPrice, totalQuantity } = useMemo(() => {
    let calculatedPrice = 0;
    let calculatedQuantity = 0;

    localCart.forEach(variant => {
      if (selectedItems.has(variant.id_productVariant)) {
        calculatedPrice += variant.price * variant.quantity;
        calculatedQuantity += variant.quantity;
      }
    });

    return { totalPrice: calculatedPrice, totalQuantity: calculatedQuantity };
  }, [selectedItems, localCart]);

  // Get selected products based on selected items
  const getSelectedProducts = () => {
    return localCart.filter(item => selectedItems.has(item.id_productVariant));
  };

  // Handle selection of items
  const handleCheckboxChange = (variantId) => {
    const updatedSelectedItems = new Set(selectedItems);
    if (updatedSelectedItems.has(variantId)) {
      updatedSelectedItems.delete(variantId);
    } else {
      updatedSelectedItems.add(variantId);
    }
    setSelectedItems(updatedSelectedItems);
  };

  // Handle select/deselect all items
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedItems(new Set()); // Deselect all
    } else {
      const allVariantIds = new Set(localCart.map(item => item.id_productVariant));
      setSelectedItems(allVariantIds); // Select all
    }
    setSelectAll(!selectAll); // Toggle selectAll
  };

  // Handle removing an item from the cart
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
          toast('Product removed from cart');
        }
      } catch (error) {
        console.error('Error removing item from cart:', error);
        toast.error('Unable to remove item from cart');
      }
    } else {
      const cartData = localStorage.getItem('cart');
      if (!cartData) return;
      const parsedCart = JSON.parse(cartData);
      const updatedCart = parsedCart.filter(item => item.id_productVariant !== id_productVariant);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setLocalCart(updatedCart);
      setSelectedItems(prevSelected => new Set([...prevSelected].filter(item => item !== id_productVariant)));
      toast('Product removed from cart');
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    const selectedProducts = getSelectedProducts();

    if (selectedProducts.length > 0) {
      localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
      navigate('/checkout');
    } else {
      alert('Please select at least one product to checkout');
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
    <div>
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
                    <h3 className="breadcrumb-title">CỬA HÀNG</h3>
                    <ul className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <a href="index.html">
                          <i className="fa fa-home" />
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="shop.html">Cửa hàng</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Giỏ Hàng
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      {isLoading ? (
        <p>Loading cart...</p>
      ) : (
        <div className="cart-main-wrapper section-padding">
          <div className="container">
            <div className="section-bg-color">
              <div className="row">
                <div className="col-lg-12">
                  <div className="cart-table table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="pro-thumbnail">
                            <input
                              type="checkbox"
                              checked={selectAll}
                              onChange={handleSelectAllChange}
                            />
                          </th>
                          <th className="pro-thumbnail">Hình Ảnh</th>
                          <th className="pro-title">Tên Sản Phẩm</th>
                          <th className="pro-price">Giá </th>
                          <th className="pro-quantity">Số Lượng</th>
                          <th className="pro-subtotal">Subtotal</th>
                          <th className="pro-remove">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {localCart.length > 0 ? (
                          localCart.map(variant => (
                            <tr key={variant.id_productVariant}>
                              <td>
                                <div className="checkbox-control">
                                  <input
                                    type="checkbox"
                                    checked={selectedItems.has(variant.id_productVariant)}
                                    onChange={() => handleCheckboxChange(variant.id_productVariant)}
                                  />
                                </div>
                              </td>
                              <td className="pro-thumbnail">
                                <Link to={`/product_details/${variant.productId}`}>
                                  <img className="img-fluid" src={variant.image || '/default-image.jpg'} alt={variant.name} width={100} />
                                </Link>
                              </td>
                              <td className="pro-title">
                                <Link to={`/product_details/${variant.productId}`}>
                                  {variant.name || variant.productName}
                                </Link>
                              </td>
                              <td className="pro-price">
                                <span>{variant.price.toLocaleString()} VND</span>
                              </td>
                              <td className="pro-quantity">
                                <div className="pro-qty">
                                  <input type="text" value={variant.quantity} readOnly />
                                </div>
                              </td>
                              <td className="pro-subtotal">
                                <span>{(variant.price * variant.quantity).toLocaleString()} VND</span>
                              </td>
                              <td className="pro-remove">
                                <button onClick={() => handleRemoveFromCart(variant.id_productVariant)}>
                                  <i className="fa fa-trash-o"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="6">Your cart is empty!</td></tr>
                        )}
                      </tbody>
                    </table>
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
                          <tr>
                           
                            <td>Tổng: {totalQuantity} sản phẩm</td>
                          </tr>
                          
                          <tr className="total">
                            <td>Tổng tiền:</td>
                            <td className="total-amount">{(totalPrice).toLocaleString()} VND</td> {/* Add shipping to total */}
                          </tr>
                        </table>
                      </div>
                    </div>
                    <button className="btn btn-sqr2 d-block" onClick={handleCheckout}>
                      Thanh toán
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;