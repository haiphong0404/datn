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

    // Assuming orderDetail is an array of items, not just a single item
    const orderItems = orderDetail || [];

    return (
        <div>
            <div className="myaccount-content">
                <h5>Chi Tiết Đơn Hàng</h5>
                {/* User Information from order */}
                {orderItems && orderItems[0] && (
                    <div className="account-details-form">
                        <form>
                            <div className="single-input-item">
                                <label htmlFor="display-name" className="required">Họ Và Tên</label>
                                <input
                                    type="text"
                                    id="display-name"
                                    placeholder="Tên Hiển Thị"
                                    value={orderItems[0].name || ''}
                                    readOnly
                                />
                            </div>
                            <div className="single-input-item">
                                <label htmlFor="email" className="required">Địa Chỉ Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Địa Chỉ Email"
                                    value={orderItems[0].email || ''}
                                    readOnly
                                />
                            </div>
                            <div className="single-input-item">
                                <label htmlFor="phone" className="required">Số điện thoại</label>
                                <input
                                    type="text"
                                    id="phone"
                                    placeholder="Số điện thoại"
                                    value={orderItems[0].phone || ''}
                                    readOnly
                                />
                            </div>
                            <div className="single-input-item">
                                <label htmlFor="address" className="required">Địa Chỉ</label>
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Địa Chỉ"
                                    value={orderItems[0].address || ''}
                                    readOnly
                                />
                            </div>

                            {/* Display additional order information */}
                            <div className="single-input-item">
                                <label htmlFor="order-date" className="required">Ngày Đặt Hàng</label>
                                <input
                                    type="text"
                                    id="order-date"
                                    value={orderItems[0].order_date || ''}
                                    readOnly
                                />
                            </div>
                            <div className="single-input-item">
                                <label htmlFor="status" className="required">Trạng Thái Đơn Hàng</label>
                                <input
                                    type="text"
                                    id="status"
                                    value={orderItems[0].status || ''}
                                    readOnly
                                />
                            </div>
                            <div className="single-input-item">
                                <label htmlFor="payment-status" className="required">Trạng Thái Thanh Toán</label>
                                <input
                                    type="text"
                                    id="payment-status"
                                    value={orderItems[0].payment_status || ''}
                                    readOnly
                                />
                            </div>
                            <div className="single-input-item">
                                <label htmlFor="infor" className="required">Thông Tin Khác</label>
                                <input
                                    type="text"
                                    id="infor"
                                    value={orderItems[0].infor || ''}
                                    readOnly
                                />
                            </div>
                        </form>
                    </div>
                )}

                {/* Order Items */}
                {orderItems && orderItems.length > 0 && (
                    <div>
                        <div className="section-bg-color">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="cart-table table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th className="pro-thumbnail">Ảnh</th>
                                                    <th className="pro-title">Sản phẩm</th>
                                                    <th className="pro-price">Giá</th>
                                                    <th className="pro-quantity">Số lượng</th>
                                                    <th className="pro-subtotal">Tổng cộng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Loop through all order items */}
                                                {orderItems.map((item) => (
                                                    <tr key={item.id}>
                                                        <td className="pro-thumbnail">
                                                            <a href="#">
                                                                <img
                                                                    className="img-fluid"
                                                                    src={item.image} // Use a placeholder if image is null
                                                                    alt="Product Image"
                                                                />
                                                            </a>
                                                        </td>
                                                        <td className="pro-title">
                                                            <a href="#">{item.name}</a>
                                                        </td>
                                                        <td className="pro-price">
                                                            <span>{parseFloat(item.price).toFixed(2)}₫</span>
                                                        </td>
                                                        <td className="pro-quantity">
                                                            <span>{item.quantity}</span>
                                                        </td>
                                                        <td className="pro-subtotal">
                                                            <span>{(parseFloat(item.price) * item.quantity).toFixed(2)}₫</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
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
