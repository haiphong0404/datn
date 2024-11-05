import React from 'react';
import { Link } from 'react-router-dom';
import useOrders from '../../hooks/useOrder'; // Đảm bảo đúng đường dẫn tới hook

const Orders = () => {
    const { orders, error } = useOrders(); // Lấy danh sách đơn hàng từ hook

    if (error) {
        console.error('Lỗi khi tải đơn hàng:', error); // Hiển thị thông báo lỗi nếu có
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div>
                <div className="myaccount-content">
                    <h5>Đơn Hàng</h5>
                    <div className="myaccount-table table-responsive text-center">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th>Đơn Hàng</th>
                                    <th>Ngày</th>
                                    <th>Trạng Thái</th>
                                    <th>Tổng Cộng</th>
                                    <th>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{new Date(order.order_date).toLocaleDateString('vi-VN')}</td>
                                            <td>{order.status}</td>
                                            <td>${order.total_amount}</td>
                                            <td>
                                                <Link to={`/my_account/Order_detail/${order.id}`} className="btn btn-sqr">
                                                    Xem
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">Không có đơn hàng nào.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
