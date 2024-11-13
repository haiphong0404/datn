const add = (product) =>{

    return {
        type : "ADDTOCART",
        payload: product
    }
}
export default add;

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
  