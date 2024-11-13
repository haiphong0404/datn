import axios from 'axios';

const addToCartAPI = (productId, quantity) => {
    return axios.post('http://127.0.0.1:8000/api/cart/add', {
        product_id: productId,
        quantity: quantity
    }, {
        headers: {
            'X-CSRF-TOKEN': localStorage.getItem('csrf_token'), // Nếu bạn lưu token CSRF
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};


