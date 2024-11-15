import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOrderDetail from '../../hooks/useOderDetail';
import useOrderById from '../../hooks/useOrderById';

const Order_detail = () => {    
    const { orderId } = useParams(); 
    const { orderDetail, loading, error } = useOrderDetail(orderId); 
    const { orders } = useOrderById(orderId); 

    // Log the data to check
    useEffect(() => {
        console.log('Loading:', loading);  
        console.log('Error:', error);      
        console.log('Order Detail:', orderDetail);
        console.log('Order:', orders);  
    }, [loading, error, orderDetail]); 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Assuming orderDetail is an array, get the first object (since it's an array with one element)
    const order = orders || {};
    const orderItems = orderDetail && orderDetail[0] ? orderDetail[0] : {};

    return (
        <div>
            <div className="myaccount-content">
                <h5>Chi Tiết Đơn Hàng</h5>
                {/* User Information from order */}
                {orders && (
                    <div className="account-details-form">
                        <form>
                            <div className="single-input-item">
                                <label htmlFor="display-name" className="required">Họ Và Tên</label>
                                <input
                                    type="text"
                                    id="display-name"
                                    placeholder="Tên Hiển Thị"
                                    value={order.name || ''}
                                    readOnly
                                />
                            </div>
                            <div className="single-input-item">
                                <label htmlFor="email" className="required">Địa Chỉ Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Địa Chỉ Email"
                                    value={order.email || ''}
                                    readOnly
                                />
                            </div>
                            <div className="single-input-item">
                                <label htmlFor="phone" className="required">Số điện thoại</label>
                                <input
                                    type="text"
                                    id="phone"
                                    placeholder="Số điện thoại"
                                    value={order.phone || ''}
                                    readOnly
                                />
                            </div>
                            <div className="single-input-item">
                                <label htmlFor="address" className="required">Địa Chỉ</label>
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Địa Chỉ"
                                    value={order.address || ''}
                                    readOnly
                                />
                            </div>
                        </form>
                    </div>
                )}

                {/* Order Item Details */}
                {orderItems && (
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
                                                {/* Displaying order items */}
                                                <tr key={orderItems.id}>
                                                    <td className="pro-thumbnail">
                                                        <a href="#">
                                                            {/* If image exists, display it, otherwise show a placeholder */}
                                                            <img
                                                                className="img-fluid"
                                                                src={orderItems.image || 'path/to/placeholder.jpg'} // Use a placeholder if image is null
                                                                alt="Product Image"
                                                            />
                                                        </a>
                                                    </td>
                                                    <td className="pro-title">
                                                        <a href="#">{orderItems.name}</a>
                                                    </td>
                                                    <td className="pro-price">
                                                        <span>{parseFloat(orderItems.price).toFixed(2)}₫</span>
                                                    </td>
                                                    <td className="pro-quantity">
                                                        <span>{orderItems.quantity}</span>
                                                    </td>
                                                    <td className="pro-subtotal">
                                                        <span>{(parseFloat(orderItems.price) * orderItems.quantity).toFixed(2)}₫</span>
                                                    </td>
                                                </tr>
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
