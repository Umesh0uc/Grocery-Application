import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "../utils/commonTypes";
import axios from "axios";
import { endpoints } from "../utils/utils";
import type { AppDispatch } from "./store";

export type CartState = {
    items: Product[],
    status: 'loading' | 'success' | 'failed',
    count: number,
    total: number
};

const initState: CartState = {
    items: [],
    status: 'loading',
    count: 0,
    total: 0,
};

export const fetchCartItems = createAsyncThunk<{items: Product[], count: number, total: number}, void>('cart/fetchCart', async (_, {rejectWithValue}) => {
    try{
        const { data } = await axios.get(endpoints.cartService);
        return data.data;
    }
    catch(e: any){
        console.error(e);
        return rejectWithValue(e?.message);
    }
});

export const saveToCart = createAsyncThunk<Product, {_id:string, quantity: number, dispatch: AppDispatch}>('cart/saveToCart', async ({_id,quantity,dispatch}, {rejectWithValue}) => {
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

export const deleteFromCart = createAsyncThunk<number, {_id:string, index: number, dispatch: AppDispatch}>('cart/deleteFromCart', async ({_id,index,dispatch}, {rejectWithValue}) => {
    try{
        const { data } = await axios.delete(endpoints.cartService + `/${_id}`);
        if(data.success){
            dispatch(fetchCartItems());
            return index;
        }
        throw new Error('Can not delete item');
    }
    catch(e: any){
        console.error(e);
        return rejectWithValue(-1);
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
            state.items = action.payload.items;
            state.count = action.payload.count;
            state.total = action.payload.total;
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
        .addCase(deleteFromCart.fulfilled, (state, action) => {
            if(action.payload > -1){
                state.items.splice(action.payload, 1);
                state.status = 'success';
            }
            else{
                state.status = 'failed';
            }
        })
        .addCase(deleteFromCart.rejected, (state) => {
            state.status = 'failed';
        })
    }
});

export const { addToCart } = cartReducer.actions;
export default cartReducer.reducer;