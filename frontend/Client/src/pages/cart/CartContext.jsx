// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    // Fetch cart items from API
    const response = await axios.get('http://localhost:8000/api/cart/items');
    setCartItems(response.data);
  };

  const addItemToCart = async (product) => {
    await axios.post('http://localhost:8000/api/cart/add', {
      product_id: product.id,
      quantity: 1,
    });
    fetchCartItems(); // Refresh the cart items
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};
