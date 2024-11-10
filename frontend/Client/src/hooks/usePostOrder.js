import { useState } from 'react';
import { postOrderByUserId } from '../api/order.js'; // Import your API function

const usePostOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orderResponse, setOrderResponse] = useState(null);

    const postOrder = async (user_id, orderData) => {
        setLoading(true);
        setError(null);
        try {
            // Call the API function to post the order
            const response = await postOrderByUserId(user_id, orderData);
            setOrderResponse(response); 
            return response; // Trả về response cho việc sử dụng .then()
        } catch (err) {
            setError(err.message);
            throw new Error(err.message); // Ném lỗi ra để sử dụng .catch()
        } finally {
            setLoading(false);
        }
    };

    return { postOrder, loading, error, orderResponse };
};
export default usePostOrder;