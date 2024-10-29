import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const addToCartAPI = (productId, quantity) => 
    API.post('/cart/add', { product_id: productId, quantity });
