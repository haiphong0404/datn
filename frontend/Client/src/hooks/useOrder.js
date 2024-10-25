import { useEffect, useState } from 'react';
import { getOrderByUserId } from '../api/order.js'; // Đảm bảo đúng đường dẫn đến hàm API

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Lấy thông tin người dùng từ localStorage
        const storedUserInfo = localStorage.getItem('userInfo');
        const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

        const userId = userInfo ? userInfo.id : null; // Lấy userId từ userInfo
        console.log('User ID:', userId); // Kiểm tra userId

        if (userId) {
            getOrderByUserId(userId)
                .then(data => {
                    console.log('Dữ liệu trả về:', data); // Xem dữ liệu nhận được
                    setOrders(data); // Thiết lập danh sách đơn hàng
                })
                .catch(err => {
                    console.error('Lỗi:', err.message); // Log lỗi nếu có
                    setError(err.message); // Lưu lỗi nếu có
                });
        }
    }, []);

    console.log('Danh sách đơn hàng:', orders); // Kiểm tra danh sách đơn hàng
    return { orders, error }; // Trả về orders và error
};

export default useOrders;
