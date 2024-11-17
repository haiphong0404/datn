import { useEffect, useState } from 'react';
import { getOrderById } from '../api/order.js';  // Assuming you have this API function for fetching order by ID

const useOrderById = (orderId) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderId) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const orderData = await getOrderById(orderId);
                setOrder(orderData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);  // Effect runs whenever `orderId` changes

    return { order, loading, error };
};

export default useOrderById;
