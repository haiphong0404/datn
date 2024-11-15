import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useOrderById from '../../hooks/useOrderById';
import useOderDetail from '../../hooks/useOderDetail';

const Order_Detail = () => {
  const { id } = useParams(); // Lấy orderId từ URL
  const { order, loading: orderLoading, error: orderError } = useOrderById(id); // Sử dụng hook useOrderById
  const { orderDetail, loading: detailLoading, error: detailError } = useOderDetail(id); // Sử dụng hook useOrderDetail

  if (orderLoading || detailLoading) {
    return <div>Đang tải...</div>;
  }

  if (orderError || detailError) {
    return <div>Lỗi: {orderError || detailError}</div>;
  }

  if (!order || !orderDetail) {
    return <div>Không tìm thấy đơn hàng</div>;
  }

  return (
    <div>
      <div className="myaccount-content">
        <h5>Chi Tiết Đơn Hàng</h5>

        {/* User Information from order */}
        {order && (
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

        {/* Order Items */}
        {orderDetail.products && orderDetail.products.length > 0 && (
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
                        {orderDetail.products.map((product, index) => (
                          <tr key={index}>
                            <td className="pro-thumbnail">
                              <a href="#">
                                <img
                                  className="img-fluid"
                                  src={product.image || 'path/to/placeholder.jpg'} // Placeholder image if not available
                                  alt="Product Image"
                                />
                              </a>
                            </td>
                            <td className="pro-title">
                              <a href="#">{product.name}</a>
                            </td>
                            <td className="pro-price">
                              <span>{parseFloat(product.price).toFixed(2)}₫</span>
                            </td>
                            <td className="pro-quantity">
                              <span>{product.quantity}</span>
                            </td>
                            <td className="pro-subtotal">
                              <span>{(parseFloat(product.price) * product.quantity).toFixed(2)}₫</span>
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

export default Order_Detail;
