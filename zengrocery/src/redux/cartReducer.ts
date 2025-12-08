import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../utils/commonTypes";

export type CartState = {
    items: Record<string, Product>,
    count: number
};

const initState: CartState = {
    items: {},
    count: 0
};

const cleanEmptyState = (object: Record<string, Product | undefined>) => {
    Object.keys(object).forEach(id => {
        if(!object[id]){
            delete object[id];
        }
    });
};

const cartReducer = createSlice({
    name: "cart",
    initialState: initState,
    reducers: {
        addToCart: (state, action) => {
            if(state.count < 10){
                cleanEmptyState(state.items);
                action.payload.quantity = 1;
                state.items[action.payload._id] = action.payload;
                state.count+=1;
            }
        },
        removeCartItem: (state, action) => {
            if(state.count > 0){
                cleanEmptyState(state.items);
                delete state.items[action.payload];
                state.count-=1;
            }
        },
        updateQuantity: (state, {payload}) => {
        },
    },
});

export const { addToCart, removeCartItem, updateQuantity } = cartReducer.actions;
export default cartReducer.reducer;