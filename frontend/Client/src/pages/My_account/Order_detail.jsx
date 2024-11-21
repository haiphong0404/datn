import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOrderDetail from '../../hooks/useOderDetail';
import CancelOrderButton from '../oder/CancelOrderButton ';

const Order_detail = () => {
    const { orderId } = useParams();
    const { orderDetail, loading, error, refetch } = useOrderDetail(orderId);

    const [orderItems, setOrderItems] = useState([]);
    const [orderStatus, setOrderStatus] = useState(null); // Trạng thái hiện tại của đơn hàng

   

    // Cập nhật orderItems và orderStatus khi orderDetail thay đổi
    useEffect(() => {
        if (orderDetail?.status) {
            setOrderItems(orderDetail.products);  // Cập nhật sản phẩm từ orderDetail
            setOrderStatus(orderDetail.status);  // Cập nhật trạng thái của đơn hàng
        }
    }, [orderDetail]);  // Khi orderDetail thay đổi, cập nhật lại orderItems và orderStatus

    // Hiển thị khi đang tải hoặc có lỗi
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log("refetch", orderItems)
    return (
        <div>
            <div className="myaccount-content">
                <h5>Chi Tiết Đơn Hàng</h5>

                {/* Thông tin người đặt hàng */}
                {orderDetail && (
                    <div className="account-details-form">
                        <div className="single-input-item">
                            <label htmlFor="display-name" className="required">Họ Và Tên</label>
                            <p>{orderDetail.name || ''}</p>
                        </div>
                        <div className="single-input-item">
                            <label htmlFor="display-name" className="required">Email</label>
                            <p>{orderDetail.email || ''}</p>
                        </div>
                        <div className="single-input-item">
                            <label htmlFor="phone" className="required">Số điện thoại</label>
                            <p>{orderDetail.phone || ''}</p>
                        </div>
                        <div className="single-input-item">
                            <label htmlFor="address" className="required">Địa Chỉ</label>
                            <p>{orderDetail.address || ''}</p>
                        </div>
                        <div className="single-input-item">
                            <label htmlFor="order-date" className="required">Ngày Đặt Hàng</label>
                            <p>{orderDetail.order_date || ''}</p>
                        </div>
                        <div className="single-input-item">
                            <label htmlFor="status" className="required">Trạng Thái Đơn Hàng</label>
                            <p>
                                {orderStatus === 'pending'
                                    ? 'Đang Xử Lý'
                                    : orderStatus === 'completed'
                                        ? 'Hoàn Thành'
                                        : orderStatus === 'cancelled'
                                            ? 'Đã Hủy'
                                            : 'Không Xác Định'}

                            </p>
                        </div>
                        <div className="single-input-item">
                            <label htmlFor="payment-status" className="required">Trạng Thái Thanh Toán</label>
                            <p>
                                {orderDetail.payment_status === 'unpaid'
                                    ? 'Thanh Toán Khi Nhận Hàng'
                                    : orderDetail.payment_status === 'paid'
                                        ? 'Đã Thanh Toán'
                                        : 'Không Xác Định'}
                            </p>
                        </div>
                        <div className="single-input-item">
                            <label htmlFor="infor" className="required">Thông Tin Khác</label>
                            <p>{orderDetail.infor || ''}</p>
                        </div>
                    </div>
                )}
                <h5 className="checkout-title"></h5>
                {orderDetail.status !== 'completed' && orderDetail.status !== 'cancelled' && (
                    <div className="checkout-btn" style={{ marginTop: '30px' }}>
                        <CancelOrderButton orderId={orderId} refetch={refetch} />
                    </div>
                )}
                {/* Hiển thị sản phẩm trong đơn hàng */}
                {orderItems.length > 0 && (
                    <div className="section-bg-color" style={{ marginTop: '5%' }}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="cart-table table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="pro-title">Tên</th>
                                                <th className="pro-title">Ảnh</th>
                                                <th className="pro-title">Màu sắc</th>
                                                <th className="pro-title">Kích thước</th>
                                                <th className="pro-price">Giá</th>
                                                <th className="pro-quantity">Số lượng</th>
                                                <th className="pro-subtotal">Tổng cộng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="pro-title">
                                                        {item.product?.name || 'Tên sản phẩm không có'}
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

                                            <tr className="total-amount-row">
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
            </div>
        </div>
    );
};

export default Order_detail;
