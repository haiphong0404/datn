import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLoginForm } from '../hooks/useLoginForm';
import usePostOrder from '../hooks/usePostOrder'; // Import the custom hook for posting order

const Checkout = () => {
  const { userInfo } = useLoginForm();
  const { postOrder, loading, error, orderResponse } = usePostOrder(); // Destructure from usePostOrder

  const [userDetails, setUserDetails] = useState({
    email: '',
    username: '',
    address: '',
    phone: '',
    info: ''
  });

  const [selectedVariants, setSelectedVariants] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash'); // Track selected payment method

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

    const storedVariants = JSON.parse(localStorage.getItem('selectedVariants')) || [];
    setSelectedVariants(storedVariants);

    const storedTotal = calculateTotalSelected(storedVariants);
    setTotalAmount(storedTotal);
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserDetails({
      ...userDetails,
      [id]: value
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value); // Update payment method based on selected radio button
  };

  const calculateTotalSelected = (variants) => {
    return variants.reduce((total, variant) => total + (variant.price * variant.quantity), 0);
  };

  const handleSubmitOrder = () => {
    const orderData = {
      userDetails,
      selectedVariants,
      totalAmount,
      info: userDetails.info,
      paymentMethod // Include the selected payment method in the order data
    };
    console.log('Dữ liệu đơn hàng đang được gửi:', orderData);
    // Call postOrder with user_id and orderData
    if (userInfo?.id) {
      postOrder(userInfo.id, orderData)
        .then(() => {
          toast.success("Đặt hàng thành công!"); // Thông báo thành công
        })
        .catch((error) => {
          toast.error(`Đặt hàng thất bại: ${error.message}`); // Thông báo thất bại
        });
    } else {
      toast.error("Không tìm thấy người dùng!"); // Nếu không có user_id
    }
  };

  return (
    <div>
      <main>
        {/* breadcrumb area start */}
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
                    <h3 className="breadcrumb-title">SHOP</h3>
                    <ul className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <a href="index.html">
                          <i className="fa fa-home" />
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="shop.html">Shop</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Checkout
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* breadcrumb area end */}

        {/* checkout main wrapper start */}
        <div className="checkout-page-wrapper section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Add more content here if needed */}
              </div>
            </div>
            <div className="row">
              {/* Checkout Billing Details */}
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
                          placeholder="Email Address"
                          value={userDetails.email}
                          onChange={handleInputChange}

                        />
                      </div>
                      <div className="single-input-item">
                        <label htmlFor="town" className="required">Địa Chỉ</label>
                        <input
                          type="text"
                          id="address"
                          placeholder="Địa Chỉ"
                          value={userDetails.address || ""}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="single-input-item">
                        <label htmlFor="phone">Số Điện Thoại</label>
                        <input
                          type="text"
                          id="phone"
                          placeholder="Số Điện Thoại"
                          value={userDetails.phone}
                          onChange={handleInputChange}

                        />
                      </div>

                      <div className="single-input-item">
                        <label htmlFor="info">Thông Tin Thêm</label>
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

              {/* Order Summary Details */}
              <div className="col-lg-6">
                <div className="order-summary-details">
                  <h5 className="checkout-title">Tóm tắt đơn hàng của bạn</h5>
                  <div className="order-summary-content">
                    <div className="order-summary-table table-responsive text-center">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th><b>Sản phẩm</b></th>
                            <th><b>Tạm tính</b></th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedVariants.map((variant, index) => (
                            <tr key={index}>
                              <td>
                                <a href="product-details.html">
                                  {variant.productName} <strong> × {variant.quantity}</strong>
                                </a>
                              </td>
                              <td>${(variant.price * variant.quantity).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>Tổng cộng</td>
                            <td>${totalAmount.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
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
                              value="bank"
                              className="custom-control-input"
                              checked={paymentMethod === 'bank'}
                              onChange={handlePaymentMethodChange}
                            />
                            <label className="custom-control-label" htmlFor="directbank">
                              Thanh toán online qua Ví điện tử MoMo
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
          </div>
        </div>
        {/* checkout main wrapper end */}
      </main>
    </div>
  );
};

export default Checkout;
