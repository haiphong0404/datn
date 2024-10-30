import { saveCartToLocalStorage } from "../actions/action.js";


const initialState ={
 cart: [], // Thay 'items' bằng 'carts'
}
 const updateCart = (state=initialState ,action)=>{
  switch (action.type) {
    case "ADDTOCART":
  const existingItemIndex = state.cart.findIndex(
    (item) => item.id === action.payload.id
  );

  if (existingItemIndex !== -1) {
    // Nếu sản phẩm đã tồn tại, tăng số lượng
    const updatedCart = state.cart.map((item, index) =>
      index === existingItemIndex
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    saveCartToLocalStorage(updatedCart);
    return {
      ...state,
      cart: updatedCart,
    };
  } else {
    // Nếu sản phẩm chưa tồn tại, thêm mới với quantity là 1
    return {
      ...state,
      cart: [...state.cart, { ...action.payload, quantity: 1 }],
    };
  }

default:
  return state;

  case "REMOVEFROMCART":
  return {
    ...state,
    cart: state.cart.filter((item) => item.id !== action.payload),
  };
  
  }
 }
export default updateCart;
