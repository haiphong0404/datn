import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOrderDetail from '../../hooks/useOderDetail';

const Order_detail = () => {
    const { orderId } = useParams();
    const { orderDetail, loading, error } = useOrderDetail(orderId);

    // Log the data to check
    useEffect(() => {
        console.log('Loading:', loading);
        console.log('Error:', error);
        console.log('Order Detail:', orderDetail);
    }, [loading, error, orderDetail]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Assuming orderDetail is an array of items
    const orderItems = orderDetail?.products || [];

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
                                {orderDetail.status === 'pending'
                                    ? 'Đang Xử Lý'
                                    : orderDetail.status === 'completed'
                                        ? 'Hoàn Thành'
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

                {/* Hiển thị sản phẩm trong đơn hàng */}
                {orderItems.length > 0 && (
                    <div className="section-bg-color" style={{ marginTop: '5%' }}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="cart-table table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="pro-title">Sản phẩm</th>
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
                                                        {item.color?.name  || 'Màu sắc không có' }
                                                    </td>
                                                    <td className="pro-title">
                                                        {item.size?.name  || 'Kích thước không có'}
                                                    </td>
                                                    <td className="pro-price">
                                                        <span>{parseFloat(item.price).toFixed(0)}₫</span>
                                                    </td>
                                                    <td className="pro-quantity">
                                                        <span>{item.quantity}</span>
                                                    </td>
                                                    <td className="pro-subtotal">
                                                        <span>{(parseFloat(item.price) * item.quantity).toFixed(0)}₫</span>
                                                    </td>
                                                </tr>
                                            ))}
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
