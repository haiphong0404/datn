import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [localCart, setLocalCart] = useState([]);
  const [isLoading, setLoading] = useState(true);

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
      setLocalCart([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddToCart = async ({
    selectedVariant,
    selectedColor,
    selectedSize,
    product,
    selectedQuantity,
}) => {
    if (!selectedColor || !selectedSize) {
        toast.error("Vui lòng chọn màu và kích thước sản phẩm!");
        return;
    }

    if (!selectedVariant) {
        toast.error("Vui lòng chọn biến thể sản phẩm!");
        return;
    }

    const quantity = selectedQuantity;

    const localCartItem = {
        id_productVariant: selectedVariant.id,
        productId: product.id,
        color: selectedColor,
        size: selectedSize,
        price: selectedVariant.price,
        image: selectedVariant.images,
        stock: selectedVariant.quantity,
        productName: product.name,
        quantity,
    };

    try {
        const id_productVariant = selectedVariant.id;
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                '/cart/add',
                {
                    product_variant_id: id_productVariant,
                    quantity,
                    color: selectedColor,
                    size: selectedSize,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                refetch(); // Cập nhật giỏ hàng từ server
                toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
            }
        } else {
            // Nếu không có token, thêm vào local storage
            const updatedCart = [...localCart, localCartItem];
            setLocalCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
        }
    } catch (error) {
        console.error("Error occurred while adding to cart:", error);
        toast.error("Sản phẩm trong kho không đủ.");
    }
};
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
          refetch(); // Gọi lại để cập nhật giỏ hàng từ server
          toast('Sản phẩm đã được xóa khỏi giỏ hàng.');
        } else {
          toast('Không thể xóa sản phẩm. Vui lòng thử lại.');
        }
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    } else {
       // Nếu không có token (chưa đăng nhập), xóa sản phẩm khỏi giỏ hàng trong localStorage
    const updatedCart = localCart.filter(item => item.id_productVariant !== id_productVariant);
    setLocalCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast('Sản phẩm đã được xóa khỏi giỏ hàng.');
    }
  };

  return (
    <CartContext.Provider value={{ localCart, handleRemoveFromCart,handleAddToCart, refetch, setLocalCart, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);