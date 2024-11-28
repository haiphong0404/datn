import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLoginForm } from '../hooks/useLoginForm';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '@mui/material/Badge'; // Kiểm tra đường dẫn đúng
import { loadCartFromLocalStorage, removeFromCart } from '../actions/action';
import SearchBox from './search/SearchBox';
import SearchProducts from './search/SearchBox';
import axios from 'axios';
import { toast } from 'react-toastify';

const Header = () => {
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state.updateCart || {});

  const [localCart, setLocalCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());

  const handleHoverCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setLocalCart(savedCart);
  };
  const fetchCartFromAPI = async () => {
    try {
      const response = await axios.get('/cart');
      setLocalCart(response.data);
      localStorage.setItem("cart", JSON.stringify(response.data));
    } catch (error) {
      console.error("Lỗi khi gọi API giỏ hàng:", error);
    }
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (cart && cart.length > 0) {
      setLocalCart(cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    } else if (Array.isArray(savedCart)) {
      setLocalCart(savedCart);
    } else {
      fetchCartFromAPI();
    }
  }, [cart]);

  // Hàm lấy tất cả dữ liệu từ giỏ hàng
  const handleGetAllCartData = () => {
    console.log("Tất cả dữ liệu trong giỏ hàng:", localCart);
    // Xử lý thêm nếu cần thiết
  };
  
  
  const handleRemoveFromCart = async (id_productVariant) => {

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


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));

    // Ensure savedCart is an array, or fall back to an empty array
    if (Array.isArray(savedCart)) {
      setLocalCart(savedCart);
    } else {
      setLocalCart([]); // If it's not an array, reset to empty array
    }
  }, []);

  // Function to calculate total price
  const calculateTotal = () => {
    if (Array.isArray(localCart)) {
      return localCart.reduce((total, item) => total + item.price * item.quantity, 0);
    } else {
      console.error('localCart is not an array:', localCart);
      return 0;
    }
  };

  const { userInfo, handleLogout } = useLoginForm();


  return (
    <header className="header-area">
      {/* main header start */}
      <div className="main-header d-none d-lg-block">
        {/* header top start */}
        <div className="header-top black-bg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="top-left-navigation"></div>
              </div>
              <div className="col-lg-6 d-flex justify-content-end">
                
                <ul className="user-info-block">
                  <li>
                    <Link to="/my_account">
                      {JSON.parse(localStorage.getItem("userInfo"))?.username || "Tài khoản"}
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/checkout">
                      <i className="fa fa-credit-card" /> Thanh Toán
                    </Link>
                  </li> */}
                  <li>
                    {JSON.parse(localStorage.getItem("userInfo")) ? (
                      // Nếu đã đăng nhập, hiển thị Đăng xuất
                      <a href="#" onClick={handleLogout}>
                        <i className="fa fa-sign-out" /> Đăng xuất
                      </a>
                    ) : (
                      // Nếu chưa đăng nhập, hiển thị Đăng nhập
                      <a href="/login">
                        <i className="fa fa-sign-in" /> Đăng nhập
                      </a>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* header top end */}
        {/* header middle area start */}
        <div className="header-main-area black-soft sticky">
          <div className="container">
            <div className="row align-items-center position-relative">
              {/* start logo area */}
              <div className="col-auto">
                <div className="logo">
                  <Link to="/">
                    <img src="/assets/img/logo/logo.png" alt="Brand Logo" />
                  </Link>
                </div>
              </div>
              {/* start logo area */}
              {/* main menu area start */}
              <div className="col-auto position-static">
                <div className="main-menu-area">
                  <div className="main-menu">
                    {/* main menu navbar start */}
                    <nav className="desktop-menu">
                      <ul>
                        <li className="position-static">
                          <Link to="/">
                            Trang chủ
                          </Link>
                        </li>
                        <li>
                          <Link to="/shop">
                            Cửa hàng
                          </Link>
                        </li>
                        <li>
                          <Link to="/blog">
                            Tin tức</Link>
                        </li>
                        <li>
                          <Link to="/contact_us">
                            Liên hệ</Link>
                        </li>
                        <li>
                          <Link to="/faqs">
                            Hỏi đáp
                          </Link>
                        </li>
                        <li>
                          <Link to="/about_us">
                            Giới thiệu
                          </Link>
                        </li>
                      </ul>
                    </nav>
                    {/* main menu navbar end */}
                  </div>
                </div>
              </div>
              {/* main menu area end */}
              {/* mini cart area start */}
              <div className="col-auto ms-auto">
                <div className="header-right">
                  <div className="header-configure-area">
                    <ul className="nav">
                      <li className="mini-cart-wrap">
                        {/* <a href="#" className="search-trigger">
                          <i className="fa fa-search" />
                        </a> */}
                        <SearchProducts />
                      </li>
                      {/* minicart của header */}
                      <li className="mini-cart-wrap">
                        <Link to="/cart" className="minicart-btn">
                          <Badge badgeContent={localCart.length} color="success">
                            <i className="fa fa-shopping-cart" />
                          </Badge>
                        </Link>
                        <div className="cart-list-wrapper" onMouseEnter={handleHoverCart}>
                          <ul className="cart-list">
                            {Array.isArray(localCart) && localCart.length > 0 ? (
                              localCart.map((variant) => (
                                <li key={variant.id_productVariant}>  {/* Đảm bảo id_productVariant là duy nhất */}
                                  <div className="cart-img">
                                    <Link to={`/product_details/${variant.productId}`}>
                                      <img src={variant.image} alt={variant.name} />
                                    </Link>
                                  </div>
                                  <div className="cart-info">
                                    <h6 className="product-name">
                                      <Link to={`/product_details/${variant.productId}`}>
                                        {variant.name || variant.productName}
                                      </Link>
                                    </h6>
                                    <span className="cart-qty">Số lượng: {variant.quantity}</span>
                                    <span className="item-price">{(variant.price * variant.quantity).toLocaleString()} VND</span>
                                  </div>
                                  <div className="del-icon" onClick={() => handleRemoveFromCart(variant.id_productVariant)}>
                                    <i className="fa fa-times" />
                                  </div>
                                </li>
                              ))

                            ) : (
                              <li>Giỏ hàng trống</li>
                            )}
                          </ul>
                          <ul className="minicart-pricing-box">
                            <li className="total">
                              <span>Total</span>
                              <span>
                                <strong>{calculateTotal()} Vnd</strong>
                              </span>
                            </li>
                          </ul>
                          <div className="minicart-button">
                            <Link to="/cart">
                              <i className="fa fa-shopping-cart" /> View Cart
                            </Link>
                            <Link to="/checkout">
                              <i className="fa fa-share" /> Checkout
                            </Link>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* mini cart area end */}
            </div>
          </div>
        </div>
        {/* header middle area end */}
      </div>
      {/* main header start */}
      {/* mobile header start */}
      <div className="mobile-header d-lg-none d-md-block sticky black-soft">
        {/*mobile header top start */}
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="mobile-main-header">
                <div className="mobile-logo">
                  <Link to="/">
                    <img src="assets/img/logo/logo.png" alt="Brand Logo" />
                  </Link>
                </div>
                <div className="mobile-menu-toggler">
                  <div className="mini-cart-wrap">
                    <Link to="/cart">
                      <i className="fa fa-shopping-cart" />
                      <div className="notification">0</div>
                    </Link>
                  </div>
                  <button className="mobile-menu-btn">
                    <span />
                    <span />
                    <span />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* mobile header top start */}
      </div>
      {/* mobile header end */}
      {/* offcanvas mobile menu start */}
      <aside className="off-canvas-wrapper">
        <div className="off-canvas-overlay" />
        <div className="off-canvas-inner-content">
          <div className="btn-close-off-canvas">
            <i className="fa fa-close" />
          </div>
          <div className="off-canvas-inner">
            {/* search box start */}
            <div className="search-box-offcanvas">
              <form>
                <input type="text" placeholder="Search Here..." />
                <button className="search-btn">
                  <i className="fa fa-search" />
                </button>
              </form>
            </div>
            {/* mobile menu end */}
            <div className="mobile-settings">
              <ul className="nav">
                <li>
                  <div className="dropdown mobile-top-dropdown">
                    <a
                      href="#"
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Tài khoản
                    </a>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/my_account">
                        Tài khoản của tôi
                      </Link>
                      <Link className="dropdown-item" to="/my_account">
                        Thông tin cá nhân
                      </Link>
                      <Link className="dropdown-item" to="/my_account">
                        Lịch sử đơn hàng
                      </Link>
                      <Link className="dropdown-item" to="/checkout">
                        Thanh toán
                      </Link>
                    </div>
                  </div>
                </li>
                <li>
                  <Link to="/contact_us">Liên hệ</Link>
                </li>
                <li>
                  <Link to="/faqs">Hỏi đáp</Link>
                </li>
              </ul>
            </div>
            {/* end of mobile settings */}
          </div>
        </div>
      </aside>
      {/* offcanvas mobile menu end */}
    </header>
  );
};

export default Header;
