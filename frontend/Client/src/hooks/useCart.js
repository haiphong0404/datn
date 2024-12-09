

import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const useCart = () => {
    const [localCart, setLocalCart] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const prevCartRef = useRef([]); // Tham chiếu để lưu trạng thái trước của giỏ hàng
  
    
    // Hàm refetch để gọi lại API và cập nhật giỏ hàng
    const refetch = useCallback(async () => {
      const token = localStorage.getItem('token');
      setLoading(true);
      try {
        if (token) {
          const response = await axios.get('/cart', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { carts } = response.data;
          if (Array.isArray(carts)) {
            setLocalCart(carts);
            localStorage.setItem('cart', JSON.stringify(carts));
          } else {
            setLocalCart([]);
            localStorage.removeItem('cart');
          }
        } else {
          const cartData = localStorage.getItem('cart');
          if (cartData) {
            setLocalCart(JSON.parse(cartData));
          } else {
            setLocalCart([]);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
        setError(error.message);
        setLocalCart([]);
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
        refetch(); // Gọi refetch khi hook được khởi tạo để lấy dữ liệu giỏ hàng từ server
      }, [refetch]);
    

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const handleRemoveFromCart = async (id_productVariant) => {
      if (!id_productVariant) {
        console.error('Product variant ID is undefined!');
        return;
      }
  
      const token = localStorage.getItem('token');
  
      if (token) {
        try {
          const response = await axios.delete(`/cart/remove/${id_productVariant}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (response.status === 200) {
            setLocalCart(prevCart => {
              const updatedCart = prevCart.filter(item => item.id_productVariant !== id_productVariant);
              localStorage.setItem('cart', JSON.stringify(updatedCart));
              return updatedCart;
            });
            refetch(); // Gọi lại để cập nhật giỏ hàng từ server
            toast('Sản phẩm đã được xóa khỏi giỏ hàng.');
          } else {
            toast('Không thể xóa sản phẩm. Vui lòng thử lại.');
          }
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      } else {
        const cartData = localStorage.getItem('cart');
        if (!cartData) {
          return;
        }
  
        const parsedCart = JSON.parse(cartData);
        const updatedCart = parsedCart.filter(item => item.id_productVariant !== id_productVariant);
  
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setLocalCart(updatedCart);
  
        toast('Sản phẩm đã được xóa khỏi giỏ hàng.');
      }
    };
  
    
  
  
    return { localCart, handleRemoveFromCart, refetch,setLocalCart };
  };
  
  export default useCart;
  