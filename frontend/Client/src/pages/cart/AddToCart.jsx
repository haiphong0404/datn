// src/components/AddToCart.jsx
import React from 'react';
import axios from '../axios'; // Đảm bảo import từ file cấu hình

const AddToCart = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/cart/add', {
        product_id: product.id,
        quantity: 1,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Nếu bạn đang sử dụng xác thực
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
