import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLoginForm } from '../hooks/useLoginForm';
import usePostOrder from '../hooks/usePostOrder';
import axios from 'axios';

const Checkout = () => {
  const { userInfo } = useLoginForm();
  const { postOrder, loading, error, orderResponse } = usePostOrder();

  const [userDetails, setUserDetails] = useState({
    email: '',
    username: '',
    address: '',
    phone: '',
    info: ''
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Get token from localStorage or any state where it's saved
  const token = localStorage.getItem('token'); // or use some global state management

  const deleteProductFromCart = async (productId) => {
    try {
      const response = await axios.delete(`/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Xóa sản phẩm khỏi giỏ hàng thất bại:', error);
      throw error;
    }
  };

  // Lấy dữ liệu người dùng và giỏ hàng khi component được mount
  useEffect(() => {
    if (userInfo) {
      setUserDetails({
        email: userInfo.email || '',
        username: userInfo.username || '',
        address: userInfo.address || '',
        phone: userInfo.phone || '',
        info: ''
      });
    }

    // Lấy sản phẩm đã chọn từ localStorage
    const storedCart = JSON.parse(localStorage.getItem('selectedProducts') || '[]');
    setSelectedProducts(storedCart);
    setTotalAmount(calculateTotalAmount(storedCart));
  }, [userInfo]);

  // Hàm tính toán tổng số tiền của giỏ hàng
  const calculateTotalAmount = (items) => {
    return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserDetails({
      ...userDetails,
      [id]: value
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const validateForm = () => {
    const { username, address, phone } = userDetails;
    if (!username || !address || !phone) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return false;
    }
    return true;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) return;
  
    const orderDate = new Date().toISOString();
    const orderData = {
      // order_date: orderDate,
      status: "pending",
      total_amount: totalAmount,
      name: userDetails.username,
      phone: userDetails.phone,
      address: userDetails.address,
      // infor: userDetails.info,
      payment_method: paymentMethod,
      user_id: userInfo?.id,
      products: selectedProducts.map((item) => ({
        product_variant_id: item.id_productVariant,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
    };
  
    console.log("Dữ liệu đơn hàng:", orderData);
  
    if (userInfo?.id) {
      try {
        // Kiểm tra phương thức thanh toán
        if (paymentMethod === "online") {
          // Thanh toán online - gọi API VNPay
          // const response = await fetch("http://127.0.0.1:8000/api/create-payment", {
          //   method: "POST",
          //   headers: {
          //     "Authorization": `Bearer ${token}`,
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     order_id: orderData.order_id,
          //     total_amount: totalAmount,
          //   }),
          // });
          
          // const data = await response.json();
          // if (data.payment_url) {
          //   // Chuyển hướng người dùng đến VNPay
          //   window.location.href = data.payment_url;
          // } else {
          //   throw new Error("Không thể tạo URL thanh toán.");
          // }
          const response = await fetch('http://127.0.0.1:8000/api/create-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              order_id: orderData.order_id,
              order_info: orderData.order_info,
              total_amount: orderData.total_amount,
              user_id: orderData.user_id,
            }),
          });
      
          const data = await response.json();
      
          if (data.status === 'success') {
            // Nếu thanh toán thành công, chuyển hướng người dùng đến trang thanh toán
            window.location.href = data.data.payment_url;
          } else {
            // Nếu có lỗi, hiển thị thông báo lỗi
            alert(data.message);
          }
        } else if (paymentMethod === "cash") {
          // Thanh toán offline - tạo đơn hàng trực tiếp
          await postOrder(userInfo.id, orderData);
          toast.success("Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.");
          
          // Xóa sản phẩm khỏi giỏ hàng sau khi tạo đơn hàng
          for (const item of selectedProducts) {
            await deleteProductFromCart(item.id_productVariant);
          }
  
          // Xóa giỏ hàng trong localStorage
          localStorage.removeItem("selectedProducts");
          localStorage.removeItem("cart");
          setSelectedProducts([]);
          setTotalAmount(0);
        } else {
          throw new Error("Phương thức thanh toán không hợp lệ.");
        }
      } catch (error) {
        toast.error(`Đặt hàng thất bại: ${error.message}`);
      }
    } else {
      toast.error("Không tìm thấy người dùng!");
    }
  };
  

  // Component xác nhận thanh toán sau khi quay về từ VNPay
// useEffect(() => {
//   const searchParams = new URLSearchParams(window.location.search);
//   const transactionStatus = searchParams.get('vnp_TransactionStatus');
//   const orderId = searchParams.get('vnp_TxnRef');

//   if (transactionStatus === '00') {
//     // Thanh toán thành công
//     toast.success("Thanh toán thành công!");
    
//     // Cập nhật trạng thái đơn hàng trong Laravel
//     updateOrderStatus(orderId, "paid");
//   } else {
//     // Thanh toán thất bại
//     toast.error("Thanh toán thất bại!");
//   }
// }, []);


  return (
    <div>
      <main>
        {/* Vùng breadcrumb bắt đầu */}
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
                        Thanh toán
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Vùng breadcrumb kết thúc */}

        {/* Vùng wrapper thanh toán bắt đầu */}
        <div className="checkout-page-wrapper section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Thêm nội dung vào đây nếu cần */}
              </div>
            </div>
            <div className="row">
              {/* Chi tiết thanh toán */}
              <div className="col-lg-6">
                <div className="checkout-billing-details-wrap">
                  <h5 className="checkout-title">Chi tiết thanh toán</h5>
                  <div className="billing-form-wrap">
                    <form action="#">
                      <div className="single-input-item">
                        <label htmlFor="com-name">Họ và tên</label>
                        <input
                          type="text"
                          id="com-name"
                          placeholder="Họ và tên"
                          value={userDetails.username}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="single-input-item">
                        <label htmlFor="email" className="required">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Email"
                          value={userDetails.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="single-input-item">
                        <label htmlFor="town" className="required">Địa chỉ</label>
                        <input
                          type="text"
                          id="address"
                          placeholder="Địa chỉ"
                          value={userDetails.address || ""}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="single-input-item">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                          type="text"
                          id="phone"
                          placeholder="Số điện thoại"
                          value={userDetails.phone}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="single-input-item">
                        <label htmlFor="info">Thông tin thêm</label>
                        <textarea
                          name="info"
                          id="info"
                          cols={30}
                          rows={3}
                          placeholder="Thông tin để shipper lưu ý"
                          value={userDetails.info || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Chi tiết tóm tắt đơn hàng */}
              <div className="col-lg-6">
                <div className="order-summary-details">
                  <h5 className="checkout-title">Tóm tắt đơn hàng của bạn</h5>
                  <div className="order-summary-content">
                    <div className="order-summary-table table-responsive text-center">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th><b>Sản phẩm</b></th>
                            <th><b>Màu sắc</b></th>
                            <th><b>Kích cỡ</b></th>
                            <th><b>Tạm tính</b></th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedProducts.map((product, index) => (
                            <tr key={index}>
                              <td>
                                <a href="product-details.html">
                                  {product.name} <strong> × {product.quantity}</strong>
                                </a>
                              </td>
                              <td>{product.color}</td>
                              <td>{product.size}</td> {/* Hiển thị kích cỡ */}
                              <td>{(product.price * product.quantity)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th className="text-right" colSpan={3}>Tổng cộng</th>
                            <td>{totalAmount}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>


                <div className="order-payment-method">
                      <div className="single-payment-method show">
                        <div className="payment-method-name">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="cashon"
                              name="paymentmethod"
                              value="cash"
                              className="custom-control-input"
                              checked={paymentMethod === 'cash'}
                              onChange={handlePaymentMethodChange}
                            />
                            <label className="custom-control-label" htmlFor="cashon">
                              Thanh toán khi nhận hàng
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="single-payment-method">
                        <div className="payment-method-name">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="directbank"
                              name="paymentmethod"
                              value="online"
                              className="custom-control-input"
                              checked={paymentMethod === 'online'}
                              onChange={handlePaymentMethodChange}
                            />
                            <label className="custom-control-label" htmlFor="directbank">
                              Thanh toán online qua Ví điện tử vnpaay
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="single-payment-method">
                        <div className="payment-method-name">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="paypalpayment"
                              name="paymentmethod"
                              value="paypal"
                              className="custom-control-input"
                              checked={paymentMethod === 'paypal'}
                              onChange={handlePaymentMethodChange}
                            />
                            <label className="custom-control-label" htmlFor="paypalpayment">
                              Thanh toán qua PayPal
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="checkout-btn">
                      <button
                        className="btn btn-sqr"
                        disabled={loading}
                        onClick={handleSubmitOrder}
                      >
                        {loading ? 'Đang xử lý...' : 'Đặt Hàng'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
     
       
    
      </main>
    </div>
  );
};

export default Checkout;
