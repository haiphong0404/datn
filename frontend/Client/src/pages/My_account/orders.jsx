import React from 'react';
import { Link } from 'react-router-dom';
import useOrders from '../../hooks/useOrder'; // Đảm bảo đúng đường dẫn tới hook

const Orders = () => {
    const { orders, error } = useOrders(); // Lấy danh sách đơn hàng từ hook

    if (error) {
        console.error('Lỗi khi tải đơn hàng:', error); // Hiển thị thông báo lỗi nếu có
        return <div>Error: {error}</div>;
    }

    // Hàm tạo mã ngẫu nhiên
    const generateRandomCode = () => {
        return 'THOR-' + Math.random().toString(36).substr(2, 9).toUpperCase(); // Tạo mã ngẫu nhiên
    };

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
                                    <th>Ngày Đặt</th>
                                    <th>Trạng Thái</th>
                                    <th>Tổng Cộng</th>
                                    <th>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{generateRandomCode()}</td> {/* Mã ngẫu nhiên */}
                                            <td>
                                                {new Date(order.order_date).toLocaleString('vi-VN', {
                                                    timeZone: 'Asia/Ho_Chi_Minh', // Đảm bảo múi giờ Việt Nam
                                                    weekday: 'long', // Ngày trong tuần (ví dụ: thứ Hai)
                                                    year: 'numeric', // Năm
                                                    month: 'long', // Tháng
                                                    day: 'numeric', // Ngày
                                                    hour12: true, // Hiển thị AM/PM
                                                })}
                                            </td>
                                            <td>
                                                {
                                                    {
                                                        pending: 'Đang Xử Lý',
                                                        completed: 'Hoàn Thành',
                                                        cancelled: 'Đã Hủy'
                                                    }[order.status] || 'Trạng Thái Không Xác Định'
                                                }
                                            </td>
                                            <td>{parseFloat(order.total_amount).toLocaleString()} VND</td>
                                            <td>
                                                <Link to={`/my_account/Order_detail/${order.id}`} className="btn btn-sqr2">
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
