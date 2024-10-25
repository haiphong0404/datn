import axios from 'axios';
export const getOrderByUserId = async (user_id) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    try {
        const response = await axios.get(`/orders/${user_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Gửi token trong header để xác thực
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Trả về dữ liệu đơn hàng của người dùng
    } catch (error) {
        throw new Error('Lỗi khi lấy thông tin đơn hàng: ' + (error.response?.data?.message || error.message));
    }
};