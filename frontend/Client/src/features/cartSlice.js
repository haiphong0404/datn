import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addItemToCart: (state, action) => {
            const item = state.find(i => i.product_id === action.payload.product_id);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.push(action.payload);
            }
        },
        // Thêm các action khác nếu cần
    },
});

export const { addItemToCart } = cartSlice.actions;
export default cartSlice.reducer;
