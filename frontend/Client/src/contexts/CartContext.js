// Context file: CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [localCart, setLocalCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(localCart));
    }, [localCart]);

    const addToCart = (product) => {
        setLocalCart((prevCart) => {
            const updatedCart = [...prevCart];
            const existingIndex = updatedCart.findIndex(item => item.id_productVariant === product.id_productVariant);
            if (existingIndex !== -1) {
                updatedCart[existingIndex] = {
                    ...updatedCart[existingIndex],
                    quantity: updatedCart[existingIndex].quantity + product.quantity,
                };
            } else {
                updatedCart.push(product);
            }
            return updatedCart;
        });
    };

    return (
        <CartContext.Provider value={{ localCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
