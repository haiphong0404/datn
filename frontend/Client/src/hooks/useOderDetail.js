import { useEffect, useState } from 'react';
import { getOrderDetail } from '../api/order.js'; 

const useOrderDetail = (orderId) => {
    const [orderDetail, setOrderDetail] = useState(null);
    const [productDetail, setProductDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (orderId) {
            setLoading(true);
            getOrderDetail(orderId)
                .then(data => {
                    console.log('Dữ liệu chi tiết đơn hàng:', data); // Kiểm tra dữ liệu chi tiết đơn hàng
                    setOrderDetail(data); // Thiết lập chi tiết đơn hàng
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Lỗi chi tiết đơn hàng:', err.message); // Log lỗi nếu có
                    setError(err.message); // Lưu lỗi nếu có
                    setLoading(false);
                });
        }
    }, [orderId]);

    return { orderDetail, error, loading }; // Trả về orderDetail, error và loading
};

export default useOrderDetail;