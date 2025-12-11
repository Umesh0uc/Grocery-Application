import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "../utils/commonTypes";
import axios from "axios";
import { endpoints } from "../utils/utils";
import type { AppDispatch, RootState } from "./store";

export type CartState = {
    items: Product[],
    status: 'loading' | 'success' | 'failed' | 'idle',
    count: number
};

const initState: CartState = {
    items: [],
    status: 'idle',
    count: 0
};

export const fetchCartItems = createAsyncThunk<Product[], void>('cart/fetchCart', async (_, {rejectWithValue}) => {
    try{
        const { data } = await axios.get(endpoints.cartService);
        return data.data;
    }
    catch(e: any){
        console.error(e);
        return rejectWithValue(e?.message);
    }
});

export const saveToCart = createAsyncThunk<Product, {_id:string, quantity: number, dispatch: AppDispatch}>('cart/saveToCart', async ({_id,quantity,dispatch}, {getState, rejectWithValue}) => {
    try{
        const { data } = await axios.post(endpoints.cartService, {_id, quantity});
        if(data.data._id && data.success){
            dispatch(fetchCartItems());
        }
        return data;
    }
    catch(e: any){
        console.error(e);
        return rejectWithValue(e?.message);
    }
});



const cartReducer = createSlice({
    name: "cart",
    initialState: initState,
    reducers: {
        addToCart: (state, action) => {
            
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchCartItems.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchCartItems.fulfilled, (state, action) => {
            state.status = 'success';
            state.items = action.payload;
        })
        .addCase(fetchCartItems.rejected, (state) => {
            state.status = 'failed';
            state.items = [];
        })
        .addCase(saveToCart.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(saveToCart.fulfilled, (state) => {
            state.status = 'success';
        })
        .addCase(saveToCart.rejected, (state) => {
            state.status = 'failed';
        })
    }
});

export const { addToCart } = cartReducer.actions;
export default cartReducer.reducer;