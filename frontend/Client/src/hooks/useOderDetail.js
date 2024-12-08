import { useEffect, useState, useCallback } from 'react';
import { getOrderDetail } from '../api/order.js'; 
import { useNavigate } from "react-router-dom";

const useOrderDetail = (orderId) => {
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Hàm refetch
    const refetch = useCallback(() => {
        if (orderId) {
            setLoading(true);  // Bắt đầu tải lại dữ liệu
            setError(null);  // Xóa lỗi cũ
            getOrderDetail(orderId)
                .then(data => {
                    console.log('Dữ liệu chi tiết đơn hàng:', data); // Kiểm tra dữ liệu
                    setOrderDetail(data);  // Lưu dữ liệu vào state
                    setLoading(false);  // Kết thúc quá trình tải
                })
                .catch(err => {
                    navigate("/*");
                    setError(err.message);  // Lưu lỗi vào state
                    setLoading(false);  // Kết thúc quá trình tải
                });
        }
    }, [orderId]);  // Tạo lại refetch mỗi khi orderId thay đổi

    useEffect(() => {
        refetch();  // Gọi refetch khi component mount hoặc orderId thay đổi
    }, [orderId, refetch]);

    return { orderDetail, error, loading, refetch };  // Trả về refetch cùng với dữ liệu
};

export default useOrderDetail;
