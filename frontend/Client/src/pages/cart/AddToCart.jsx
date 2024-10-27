// src/components/AddToCart.jsx
import axios from 'axios';
import React from 'react';


const AddToCart = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/cart/add', {
        product_id: product.id,
        quantity: 1, // Hoặc bạn có thể thêm một input để chọn số lượng
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Nếu bạn sử dụng token xác thực
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Đã có lỗi xảy ra!');
    }
  };

  return (
    <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
  );
};

export default AddToCart;