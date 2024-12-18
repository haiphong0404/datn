import React, { useState, useEffect } from 'react';
import useOrderDetail from '../hooks/useOderDetail';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckoutDetail = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const { orderId } = useParams();
  const { orderDetail, loading, error } = useOrderDetail(orderId);

  const navigate = useNavigate();
  // Log the data to check
  useEffect(() => {
    // console.log('Loading:', loading);
    // console.log('Error:', error);
    // console.log('Order Detail:', orderDetail);
  }, [loading, error, orderDetail]);

  // Assuming orderDetail is an array of items
  const orderItems = orderDetail?.products || [];

  useEffect(() => {
    // Fetch contact info
    fetch('http://127.0.0.1:8000/api/contacts')
      .then((response) => response.json())
      .then((data) => setContactInfo(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  const handlePaymentSuccess = async () => {
    try {
      const response = await axios.post(`/payment/success/${orderId}`);
      if (response.status === 200) {
        toast('Thanh toán thành công!');

        navigate('/my_account/orders')
        window.location.reload()

      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi cập nhật thanh toán:', error);
      toast('Cập nhật thanh toán thất bại');
    }
  };

  // Hàm xử lý cập nhật trạng thái thanh toán thất bại
  const handlePaymentCancel = async () => {
    try {
      const response = await axios.post(`/payment/cancel/${orderId}`);
      if (response.status === 200) {
        toast('Thanh toán đã bị hủy!');
        navigate('/')
      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi cập nhật hủy thanh toán:', error);
      alert('Cập nhật hủy thanh toán thất bại');
    }
  };
  if (!contactInfo) {
    return <div>Loading...</div>;
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <main>
        {/* breadcrumb area start */}
        <div
          className="breadcrumb-area breadcrumb-img bg-img"
          style={{
            backgroundImage: 'url(/assets/img/banner/shop.jpg)',
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-wrap">
                  <nav aria-label="breadcrumb">
                    <h3 className="breadcrumb-title">Checkout Detail</h3>
                    <ul className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <a href="index.html">
                          <i className="fa fa-home" />
                        </a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Checkout detail
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* breadcrumb area end */}

        {/* contact area start */}
        <div className="checkout-contact-area section-padding pt-0">
          <div className="container">
            {orderItems.length > 0 && (
              <div className="checkout-cart-area" style={{ marginTop: '5%' }}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="checkout-cart-table table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="checkout-pro-title">Tên</th>
                            <th className="checkout-pro-title">Ảnh</th>
                            <th className="checkout-pro-title">Màu sắc</th>
                            <th className="checkout-pro-title">Kích thước</th>
                            <th className="checkout-pro-price">Giá</th>
                            <th className="checkout-pro-quantity">Số lượng</th>
                            <th className="checkout-pro-subtotal">Tổng cộng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItems.map((item, index) => (
                            <tr key={index}>
                              <td className="pro-title">
                                {item.product?.name.substring(0, 18) || 'Tên sản phẩm không có'}
                              </td>
                              <td className="pro-title">
                                <img
                                  src={item.variant_images?.[0]?.base64_image || 'Ảnh sản phẩm không có'}
                                  alt="Product Image"
                                  style={{ width: '50px', height: '50px' }}
                                />
                              </td>
                              <td className="pro-title">
                                {item.color?.name || 'Màu sắc không có'}
                              </td>
                              <td className="pro-title">
                                {item.size?.name || 'Kích thước không có'}
                              </td>
                              <td className="pro-price">
                                <span>{parseFloat(item.price).toLocaleString()} VND</span>
                              </td>
                              <td className="pro-quantity">
                                <span>{item.quantity}</span>
                              </td>
                              <td className="pro-subtotal">
                                <span>{(parseFloat(item.price) * item.quantity).toLocaleString()} VND</span>
                              </td>

                            </tr>

                          ))}
                          <tr className="pro-title">
                            <td colSpan="6" style={{ textAlign: 'center' }}>Phí Vận Chuyển</td>
                            <td >
                              {parseFloat(orderDetail.shipping_fee).toLocaleString()} VND
                            </td>
                          </tr>
                          {orderDetail.voucher_discount != 0 && (
                            <tr className="pro-title">
                              <td colSpan="6" style={{ textAlign: 'center' }}>Mã Giảm Giá :</td>
                              <td>
                                -{parseFloat(orderDetail.voucher_discount).toLocaleString()} VND
                              </td>
                            </tr>
                          )}

                          <tr className="checkout-total-amount-row">
                            <th colSpan="6" style={{ textAlign: 'center' }}>Tổng Tiền:</th>
                            <th style={{ fontWeight: 'bold', color: '#e63946' }}>
                              {parseFloat(orderDetail.total_amount).toLocaleString()} VND
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row-online">
              {orderDetail && (
                <div className="checkout-details-form">
                  <div className="checkout-input-item">
                    <label htmlFor="display-name" className="required">Họ Và Tên</label>
                    <p>{orderDetail.name || ''}</p>
                  </div>
                  <div className="checkout-input-item">
                    <label htmlFor="display-name" className="required">Email</label>
                    <p>{orderDetail.email || ''}</p>
                  </div>
                  <div className="checkout-input-item">
                    <label htmlFor="phone" className="required">Số điện thoại</label>
                    <p>{orderDetail.phone || ''}</p>
                  </div>
                  <div className="checkout-input-item">
                    <label htmlFor="address" className="required">Địa Chỉ</label>
                    <p>{orderDetail.address || ''}</p>
                  </div>
                  <div className="checkout-input-item">
                    <label htmlFor="order-date" className="required">Ngày Đặt Hàng</label>
                    <p>{orderDetail.order_date || ''}</p>
                  </div>
                  <div className="checkout-input-item">
                    <label htmlFor="status" className="required">Trạng Thái Đơn Hàng</label>
                    <p>{orderDetail.status === 'pending' ? 'Đang Xử Lý' : orderDetail.status === 'completed' ? 'Hoàn Thành' : 'Không Xác Định'}</p>
                  </div>
                  <div className="checkout-input-item">
                    <label htmlFor="payment-status" className="required">Trạng Thái Thanh Toán</label>
                    <p>{orderDetail.payment_status === 'unpaid' ? 'Thanh Toán Khi Nhận Hàng' : orderDetail.payment_status === 'paid' ? 'Đã Thanh Toán' : 'Không Xác Định'}</p>
                  </div>
                  <div className="checkout-input-item">
                    <label htmlFor="infor" className="required">Thông Tin Khác</label>
                    <p>{orderDetail.infor || ''}</p>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              {contactInfo.slice(0, 1).map((info) => (
                <div className="col-lg-6" key={info.id}>
                  <div className="checkout-contact-info">
                    <h4 className="contact-title">Thanh Toán Online qua QR code</h4>
                    <ul>
                      <img src="\assets\img\bill\code1.jpg" alt="" width={300} />
                      <li><i className="fa fa-fax" /> Tên tài khoản: {info.name}</li>
                      <li><i className="fa fa-envelope-o" /> E-mail: {info.email}</li>
                      <li><i className="fa fa-phone" /> {info.phone}</li>
                      <li><i className="fa fa-credit-card" /> <strong>Nội dung chuyển khoản: </strong>  {`${orderDetail.name} thanh toán đơn hàng ${orderId}`}</li>
                    </ul>
                    <div className="alert alert-warning mt-3">
        <strong>Cảnh báo:</strong> Vui lòng nhập đúng nội dung chuyển khoản như trên, nếu không chúng tôi sẽ không thể xác nhận đơn hàng của bạn.
      </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="payment-actions">
              <div className="cancel-payment">
                <button className="remove-button" onClick={handlePaymentCancel}>Hủy Thanh Toán</button>
              </div>
              <div className="confirm-payment">
                <button className="btn btn-sqr" onClick={handlePaymentSuccess}>Thanh Toán</button>
              </div>
            </div>
          </div>
        </div>
        {/* contact area end */}
      </main>
    </div>
  );
};

export default CheckoutDetail;
