import axios from 'axios';



export const getOrderByUserId = async (user_id) => {
    
    try {
        const response = await axios.get(`/orders`, {
            params: { user_id }, // Send user_id as query parameter
            headers: {
              
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Return the user's order data
    } catch (error) {
        // Handle error response with more detail
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Error fetching order data:", errorMessage);
        throw new Error('Error fetching order data: ' + errorMessage);
    }
};
export const getOrderDetail = async (order_id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/order-details/${order_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Trả về dữ liệu chi tiết đơn hàng
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Lỗi khi lấy chi tiết đơn hàng:", errorMessage);
        throw new Error('Lỗi khi lấy chi tiết đơn hàng: ' + errorMessage);
    }
};
export const postOrderByUserId = async (user_id, orderData) => {
    try {
        const response = await axios.post(`/order`, orderData, {
         
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Return the response data after the order is created
    } catch (error) {
        // Handle error response with more detail
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Error posting order data:", errorMessage);
        throw new Error('Error posting order data: ' + errorMessage);
    }
};
export const getOrderById = async (order_id) => {
    try {
        const response = await axios.get(`/orders/${order_id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Return the order data for the given order_id
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Error fetching order by ID:", errorMessage);
        throw new Error('Error fetching order by ID: ' + errorMessage);
    }
};