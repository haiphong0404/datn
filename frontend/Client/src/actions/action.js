const add = (product) =>{

    return {
        type : "ADDTOCART",
        payload: product
    }
}
export default add;

export const addCart = (cartItem) =>{

    return {
        type : "ADD_TO_CART",
        payload: cartItem
    }
}

export const loadCartFromDatabase = (cartItems) => ({
  type: 'LOAD_CART_FROM_DB',
  payload: cartItems,
});

export const removeFromCart = (id) => {
    return {
      type: "REMOVEFROMCART",
      payload: id,
    };
  };
  
 export const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  export const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };
  
  // action.js
export const updateCart = (cart) => ({
  type: 'UPDATE_CART',
  payload: cart,
});

export const loadCartFromRedux = (cart) => ({
  type: 'LOAD_CART',
  payload: cart,
});

