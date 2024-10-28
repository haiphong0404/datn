import { useEffect, useState } from 'react';
import { getOrderByUserId } from '../api/order.js'; 

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        const storedUserInfo = localStorage.getItem('userInfo');
        const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

        const userId = userInfo ? userInfo.id : null;
        console.log('User ID:', userId); 

        if (userId) {
            getOrderByUserId(userId)
                .then(data => {
                    console.log('Dữ liệu trả về:', data); 
                    setOrders(data); 
                })
                .catch(err => {
                    console.error('Lỗi:', err.message);
                    setError(err.message); 
                });
        }
    }, []);

    
    return { orders, error }; 
};

export default useOrders;
